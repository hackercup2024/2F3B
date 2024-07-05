"use server";

import { db } from "@/db";

const addAttendance = async ({
  sessionId,
  studentId,
}: {
  sessionId: number;
  studentId: number;
}) => {
  await db.attendance.create({
    data: {
      studentId,
      sessionId,
    },
  });
};

export default addAttendance;
