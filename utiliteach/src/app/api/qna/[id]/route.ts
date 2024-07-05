const { GoogleGenerativeAI } = require("@google/generative-ai");
import { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from '@prisma/client'

export const dynamic = 'force-dynamic' // defaults to auto

/*
fetch api/qna/${sessionId} to get normalized questions from db

return questions lessened, empty array if no questions found with the sessionId
*/

// Function to remove duplicates and similar questions
export async function GET(req: NextApiRequest, { params }: { params: { id: string } }) {
    // get params id
    const sessionId = params.id;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Given a list of questions from students to a teacher. Delete the duplicates and similar questions. Return the list of questions in array format only and no other text."
    });


    const prisma = new PrismaClient()
    // find questions from db that has the sessionId
    const questions = await prisma.question.findMany({
        where: {
            sessionId: parseInt(sessionId),
        },
    });

    //check if questions is empty
    if (questions.length === 0) {
        return Response.json({ questions: [] });
    }
    
    // convert list of string into one string
    const questionsString = questions.map((question) => question.question).join("\n");

    const result = await model.generateContent(questionsString);
    const response = await result.response;
    const text = response.text();

    return Response.json({ questions: text});
};