import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from 'crypto';

export async function PATCH(req: Request, {params}: {params: {serverId: string}}) {
    try {
        
        const profile = await currentProfile();

        if(!profile) {
            return new NextResponse('unauthorized', { status: 401 })
        }
        
        if(!params.serverId) {
            return new NextResponse('Server Id Missing', { status: 400 })
        }
        
        console.log("serverID" , req.url);
        

        const server = await db.server.update({
            where: {
                id: params.serverId,
                profileId: profile.id
            },
            data: {
                inviteCode: crypto.randomUUID()
            }
        })

        console.log("server", server);
        

        return NextResponse.json(server);
        
    } catch (error) {
        console.log("ERROR:::::::", error);
        return new NextResponse('Internal Error', { status: 500 })
    }
}