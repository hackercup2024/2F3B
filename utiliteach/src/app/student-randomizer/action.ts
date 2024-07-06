"use server";

import { db } from "@/db";

export const getAttendanceBySession = async ({
  sessionId
}: {
    sessionId: number
  }) => {
  return db.attendance.findMany({
    where: {
      sessionId: sessionId,
    },
  });
};

export const getStudentByStudentId = async ({
  studentId
}: {
    studentId: number
  }) => {
  return db.student.findMany({
    where: {
      id: studentId,
    },
  });
};
