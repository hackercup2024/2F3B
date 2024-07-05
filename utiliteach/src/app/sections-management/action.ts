"use server";

import { db } from "@/db";

export const createSection = async ({
  sectionName,
  teacherId,
}: {
  sectionName: string;
  teacherId: string;
}) => {
  await db.section.create({
    data: {
      sectionName,
      teacherId,
    },
  });
};

export const getSectionByTeacherId = async (teacherId: string) => {
  return db.section.findMany({
    where: {
      teacherId: teacherId,
    },
  });
};

export const getSections = async () => {
  try{
    return db.section.findMany();
  }catch(error){
    console.log(error);
  }
};