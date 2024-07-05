"use server";

import { db } from "@/db";

export const createSection = async ({
  sectionName,
  teacherId,
  subjectId,
}: {
  sectionName: string;
  teacherId: string;
  subjectId: number;
}) => {
  await db.section.create({
    data: {
      sectionName,
      teacherId,
      subjectId,
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

export const getTeachers = async () => {
  try{
    return db.user.findMany(
      {
        where: {
          userType: "teacher",
        },
      }
    );
  }catch(error){
    console.log(error);
  }
};

export const getSubjects = async () => {
  try{
    return db.subject.findMany();
  }catch(error){
    console.log(error);
  }
};