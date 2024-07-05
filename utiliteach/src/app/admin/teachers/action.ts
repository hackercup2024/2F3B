"use server";

import { db } from "@/db";

export const createTeacher = async ({
    email,
    firstName,
    middleName,
    lastName,
    Suffix,
}: {
    email: string;
    firstName: string;
    middleName: string;
    lastName: string;
    Suffix: string;
}) => {
    await db.user.create({
        data: {
            email,
            firstName,
            middleName,
            lastName,
            Suffix,
        },
    });
};

export const getTeachers = async () => {
    return db.user.findMany();
};