"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { checkSession } from "../dashboard/action";

export const getQuestions = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const hasSession = await checkSession();

  if (!hasSession) return
  // get params id
  const sessionId = hasSession.id;

  return await db.question.findMany({
    where: {
      sessionId: sessionId,
    },
  });
};
