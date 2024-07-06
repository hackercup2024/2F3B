"use server";

import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export const getQuestions = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const session = await db.session.findFirst({
    where: {
      teacherId: user?.id,
    },
  });
  return await db.question.findMany({
    where: {
      sessionId: session?.id,
    },
  });
};
