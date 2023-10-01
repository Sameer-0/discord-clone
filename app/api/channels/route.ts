import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import crypto from 'crypto';
import { MemberRole } from "@prisma/client";

export async function POST(req: Request) {
    try {
        const profile = await currentProfile();
        const {name, type} = await req.json();
        const { searchParams } = new URL(req.url);

        if(!profile) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const serverId = searchParams.get('serverId');

        if(!serverId) {
            return new NextResponse("Missing Server Id", { status: 400 });
        }

        if(name === 'general') {
            return new NextResponse("Name Cannot be 'general'", { status: 400 });
        }

        const server = await db.server.update({
            where: {
                id: serverId,
                members: {
                    some: {
                        profileId: profile.id,
                        role: {
                            in: [MemberRole.ADMIN, MemberRole.MODERATOR]
                        }
                    }
                }
            },
            data: {
                channels: {
                    create: {
                        profileId: profile.id,
                        name,
                        type
                    }
                }
            }
        })


        return NextResponse.json(server);

    } catch (error) {
        console.log("SERVER ERROR ::::::::", error);
        return new NextResponse("Internal Server Error", { status: 500 });        
    }
}