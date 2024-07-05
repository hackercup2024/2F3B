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

export const createStudent = async ({
  firstName,
  middleName,
  lastName,
  Suffix,
  gradeLevel,
  lrn,
}: {
  firstName: string;
  middleName: string;
  lastName: string;
  Suffix: string;
  gradeLevel: number;
  lrn: string;
}) => {
  await db.student.create({
    data: {
      firstName,
      middleName,
      lastName,
      Suffix,
      gradeLevel,
      lrn,
    },
  });
  // return student id of the newly created student
  const student = db.student.findMany({
    where: {
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      Suffix: Suffix,
      gradeLevel: gradeLevel,
      lrn: lrn,
    },
  });
  return student;
};

export const getStudents = async () => {
  try {
    return db.student.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const createStudentSection = async ({
  studentId,
  sectionId,
}: {
  studentId: number;
  sectionId: number;
}) => {
  await db.studentSection.create({
    data: {
      studentId,
      sectionId,
    },
  });
};

export const getStudentSections = async () => {
  try {
    return db.studentSection.findMany();
  } catch (error) {
    console.log(error);
  }
};

export const getStudentSectionByStudentId = async (studentId: number) => {
  return db.studentSection.findMany({
    where: {
      studentId: studentId,
    },
  });
};