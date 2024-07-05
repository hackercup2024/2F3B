"use client";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateSubject from "./CreateSubject";
import { getSubjects } from "./action";
import { Subject } from "@prisma/client";

const Page = () => {
  const {
    data: subjects,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-subjects-key"],
    queryFn: async () => await getSubjects(),
    retry: true,
    retryDelay: 500,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading subjects.</div>;
  }

  return (
    <div>
      <h1>Subject Management</h1>
      <CreateSubject />
      <Table>
        <TableCaption>A list of your subjects.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Subject Name</TableHead>
            <TableHead>Grade Level</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects?.map((subject: Subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.name}</TableCell>
              <TableCell>{subject.gradeLevel}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
