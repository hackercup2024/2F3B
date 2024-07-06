"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getAttendanceTally = async ({
  sectionId
}: {
    sectionId: number
  }) => {
  const result = await db.student.findMany({
    where: {
      Attendance: {
        some: {
          session: {
            sectionId: sectionId,
          },
        },
      },
    },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      Attendance: {
        where: {
          session: {
            sectionId: sectionId,
          },
        },
        select: {
          id: true,
        },
      },
    },
  });

  // Transform the result to get the total attendance count per student
  const attendancePerStudent = result.map(student => ({
    studentId: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    totalAttendance: student.Attendance.length,
  }));

  return attendancePerStudent;
};

export const getSubjects = async () => {
  return await db.subject.findMany();
}

export const getSectionBySubject = async ({
  subjectId
}: {
    subjectId: number
  }) => {
  return await db.section.findMany({ where: { subjectId } });
}

export const startSession = async ({
  sectionId
}: {
    sectionId: number
  }) => {

  const { getUser } = getKindeServerSession();
  const teacher = await getUser();
  const teacherId = teacher?.id

  if (!teacherId) return;

  const existingSession = await checkSession();

  if (existingSession) return;

  return await db.session.create({
    data: {
      sectionId: sectionId,
      date: new Date(Date.now()),
      teacherId
    }
  });
}

export const checkSession = async () => {
  const { getUser } = getKindeServerSession();
  const teacher = await getUser();
  const teacherId = teacher?.id

  if (teacherId === undefined) return undefined;

  const session = await db.session.findFirst({
    where: {
      teacherId: teacherId,
      isFinished: false
    }
  });

  console.log(session?.id);
  

  return session;
  
}
