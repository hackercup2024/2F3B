"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getQuestions } from "./actions";

const Question = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [summary, setSummary] = useState("");
  useEffect(() => {
    async function initQuestions() {
      const result = await getQuestions();
      console.log(result);
      
      setQuestions(result);

      const summary_result = await fetch('/api/qna');
      const summary = await summary_result.json();
      setSummary(summary.questions);
      
    }
    initQuestions();
  }, []);
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-2xl font-semibold">All Questions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions?.map((question: any) => (
            <TableRow key={question.id}>
              <TableCell className="p-4 ">{question.question}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center text-2xl font-semibold">Summary</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {summary && (JSON.parse(summary)).map((question: any, index: number) => (
            <TableRow key={index}>
              <TableCell className="p-4 ">{question}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Question;
