import { db } from "@/db";
import { Prisma } from "@prisma/client";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest, {params}: {params: {sid:string}}){
    // retrieves specifics of a session
    const sessionId = parseInt(params.sid);

    const session = await db.$queryRaw(
        Prisma.sql`
            SELECT *
            FROM "Session"
            WHERE "id" = ${sessionId}
            LIMIT 1
        `
    );

    if (session.length !== 0){
        return Response.json(session[0])
    }

    return Response.json({message:"Not found."}, {status: 404});
}

export async function DELETE(request: NextRequest, {params}: {params: {sid:string}}){
    // terminates a session
    const sessionId = parseInt(params.sid);

    await db.$queryRaw(
        Prisma.sql`
            UPDATE "Session"
            WHERE "id" = ${sessionId}
            SET "isFinished" = true
        `
    )

    return Response.json({message: "Successfully terminated session."})
}
