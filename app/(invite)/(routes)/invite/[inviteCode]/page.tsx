import { currentProfile } from "@/lib/current-profile"
import { db } from "@/lib/db"
import { redirectToSignIn } from "@clerk/nextjs"
import { redirect } from "next/navigation"

interface inviteCodeProps {
    params: {
        inviteCode: string
    }
}

const InvitePage = async ({
  params
}: inviteCodeProps) => {

  const profile = await currentProfile()

  if(!profile) {
    return redirectToSignIn();
  }

  if(!params.inviteCode) {
    return redirect('/');
  }

  const existsServer = await db.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id
        }
      }
    }
  })

  if(existsServer) {
    return redirect(`/servers/${existsServer.id}`);
  }

  const server = await db.server.update({
    where: {
      inviteCode: params.inviteCode
    },
    data: {
      members: {
        create: [{
          profileId: profile.id
        }]
      }
    }
  })

  if(server) {
    return redirect(`/servers/${server.id}`);
  }

  return null;
}

export default InvitePage
