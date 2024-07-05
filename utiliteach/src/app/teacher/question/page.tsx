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
            <TableHead>Questions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {questions?.map((question: any) => (
            <TableRow key={question.id}>
              <TableCell>{question.question}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p>{summary}</p>
    </>
  );
};

export default Question;
