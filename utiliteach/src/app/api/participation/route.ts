
import { db } from "@/db";
import { Prisma } from "@prisma/client";
import { type NextRequest } from "next/server";



export async function GET(request: NextRequest){
    // get sections available for new session

    const searchParams = request.nextUrl.searchParams;

    const teacherId = searchParams.get("tid");

    if (!teacherId){
        return Response.json({message: "Invalid teacher id"}, {status: 400});
    }

    const sessions = await db.$queryRaw(
        Prisma.sql`
            SELECT sec.id, sec."sectionName"
            FROM "Section" sec
            LEFT OUTER JOIN "Session" ses
                ON sec.id = ses."sectionId"
            WHERE sec."teacherId" = ${teacherId}
            `
    );

    return Response.json(sessions);

    // return Response.json({Hello: "World"})
}

export async function POST(request: NextRequest){
    // starts new session

    // check if already in a session
    // TODO

    // create new session
    const sectionId = request.nextUrl.searchParams.get("sid");

    if (!sectionId){
        return Response.json({message: "Valid section Id needed."}, {status: 400});
    }

    console.log(sectionId);

    await db.session.create({
        data: {
            sectionId: parseInt(sectionId),
            date: new Date(Date.now())
        }
    })
    // await db.$queryRaw(
    //     Prisma.sql`
    //         INSERT INTO "Session" ("sectionId", "date")
    //         VALUES
    //             (${parseInt(sectionId)}, ${new Date(Date.now())})
    //     `
    // )

    return Response.json({message: "Successfully created session."})
}

export async function PATCH(request: NextRequest){
    // adds to db
    const searchParams = request.nextUrl.searchParams;

    const sectionId = searchParams.get("sid");
    const studentId = searchParams.get("sno");

    if (!sectionId || typeof(sectionId) !== "number"){
        return Response.json({message: "Valid section Id needed."}, {status: 400});
    }

    await db.$queryRaw(
        Prisma.sql`
            UPDATE attendance
            WHERE studentid = ${studentId} AND 
            SET 
        ` 
    )
}

export async function DELETE(request: NextRequest){

    const searchParams = request.nextUrl.searchParams;

    const sessionId = searchParams.get("sid");

    if (!sessionId){
        return Response.json({message: "Invalid session id"}, {status: 400})
    }

    // check if session exists
    //

    await db.$queryRaw(
        Prisma.sql`
            UPDATE "Session"
            SET "isFinished" = true
            WHERE "id" = ${parseInt(sessionId)}
        `
    )

    return Response.json({message: "Successfully terminated session."})

}