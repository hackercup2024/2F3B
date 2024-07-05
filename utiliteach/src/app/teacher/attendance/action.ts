"use server";

import { db } from "@/db";
import { checkSession } from "../dashboard/action";

const addAttendance = async ({
  studentId,
}: {
  studentId: number;
}) => {

  const session = await checkSession();

  if (!session) return
  // get params id
  const sessionId = session.id;

  const attendace = await db.attendance.findFirst({where:{studentId, sessionId}})

  if (attendace){
    return
  }
  await db.attendance.create({
    data: {
      studentId,
      sessionId,
    },
  });
};

export default addAttendance;
