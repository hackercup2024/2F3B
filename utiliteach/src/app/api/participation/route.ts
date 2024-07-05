
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
}

export async function POST(request: NextRequest){
    // starts new session

    // create new session
    const sectionId = request.nextUrl.searchParams.get("sid");

    if (!sectionId){
        return Response.json({message: "Valid section Id needed."}, {status: 400});
    }

    await db.session.create({
        data: {
            sectionId: parseInt(sectionId),
            date: new Date(Date.now())
        }
    })

    return Response.json({message: "Successfully created session."})
}

export async function PATCH(request: NextRequest){
    // adds to db
    const searchParams = request.nextUrl.searchParams;

    const sectionId = searchParams.get("sid");
    const studentId = searchParams.get("sno");
    const sessionId = searchParams.get("sesid");

    if (!sectionId || !studentId || !sessionId){
        return Response.json({message: "Invalid parameters"}, {status: 400});
    }

    const studentAttendance = await db.attendance.findFirst({
        where: {
            studentId: parseInt(studentId),
            sessionId: parseInt(sessionId)
        }
    })

    if (!studentAttendance){
        return Response.json({message: "Not found"}, {status: 404})
    }

    await db.$queryRaw(
        Prisma.sql`
            UPDATE "Attendance"
            SET "points" = ${studentAttendance.points + 1}
            WHERE "studentId" = ${parseInt(studentId)} AND "sessionId" = ${sessionId}
        ` 
    );

    return Response.json({message: `Added point to #${studentId}`});
}