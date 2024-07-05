const { GoogleGenerativeAI } = require("@google/generative-ai");
import { NextApiRequest, NextApiResponse } from "next";
export const dynamic = 'force-dynamic' // defaults to auto

const studentQuestions: string[] = [
    "What are we learning today?",
    "Can you explain that again?",
    "When is this assignment due?",
    "Will this be on the test?",
    "Can I go to the bathroom?",
    "How do I solve this problem?",
    "What did I miss when I was absent?",
    "Can I have extra credit?",
    "How is this going to help us in real life?",
    "Can you help me with my homework?",
    "What grade did I get on the test?",
    "Can you extend the deadline?",
    "Is there any homework tonight?",
    "Can I sit with my friend?",
    "What time does class end?",
    "Can I borrow a pencil?",
    "Will there be a quiz tomorrow?",
    "Can you repeat that, please?",
    "How many pages does the essay need to be?",
    "Is it okay if I turn this in late?"
];



// Function to remove duplicates and similar questions
export async function GET(_req: NextApiRequest, res: NextApiResponse) {
    // Initialize Gemini client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: "Given a list of questions from students to a teacher. Delete the duplicates and similar questions. Return the list of questions in array format only and no other text."
    });
    // convert list of string into one string
    const questions = studentQuestions.join("\n");
    const result = await model.generateContent(questions);
    const response = await result.response;
    const text = response.text();

    return Response.json({ questions: text });
};