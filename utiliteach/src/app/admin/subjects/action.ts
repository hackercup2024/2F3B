"use server";

import { db } from "@/db";

export const createSubject = async ({
  name,
  gradeLevel,
}: {
  name: string;
  gradeLevel: number;
}) => {
  await db.subject.create({
    data: {
      gradeLevel,
      name,
    },
  });
};

export const getSubjects = async () => {
  return db.subject.findMany();
};
