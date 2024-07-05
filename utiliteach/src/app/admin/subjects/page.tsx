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
import { Loading } from "@/components/Loading";
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
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading subjects.</div>;
  }

  return (
    <div className="flex flex-grow flex-col items-center p-4">
      <div className="flex justify-center sm:justify-start">
        <h1 className="text-lapis font-bold text-3xl mb-4">Subject Management</h1>
      </div>
      <CreateSubject />
      <div className="w-full md:w-3/4">
        <Table>
          <TableCaption>A list of your subjects.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Subject Name</TableHead>
              <TableHead className="text-center">Grade Level</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subjects?.map((subject: Subject) => (
              <TableRow key={subject.id}>
                <TableCell className="text-center">{subject.name}</TableCell>
                <TableCell className="text-center">{subject.gradeLevel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="max-sm:mb-24"></div>
    </div>
  );
};

export default Page;
