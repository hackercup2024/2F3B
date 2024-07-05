"use server";

import { db } from "@/db";

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
  return await db.session.create({
    data: {
      sectionId: sectionId,
      date: new Date(Date.now())
    }
  });
}
