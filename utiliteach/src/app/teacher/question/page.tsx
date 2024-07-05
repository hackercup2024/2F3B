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
import { getQuestions, getSummary } from "./actions";

const Question = () => {
  const [questions, setQuestions] = useState<any>([]);
  const [summary, setSummary] = useState("");
  useEffect(() => {
    async function initQuestions() {
      const result = await getQuestions();
      setQuestions(result);

      const summary_result = await getSummary();
      const summary = await summary_result.json();
      setSummary(summary);
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
              <TableCell>{question.email}</TableCell>
              <TableCell>{question.firstName}</TableCell>
              <TableCell>{question.middleName}</TableCell>
              <TableCell>{question.lastName}</TableCell>
              <TableCell>{question.Suffix}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <p>{summary}</p>
    </>
  );
};

export default Question;
