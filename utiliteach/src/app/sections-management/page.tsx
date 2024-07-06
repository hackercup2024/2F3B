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
import CreateSection from "./CreateSection";
import { getSections } from "./action";
import CreateStudent from "./CreateStudent";
import { Section } from "@prisma/client";
import { getStudents } from "./action";
import { Student } from "@prisma/client";
import { getStudentSections } from "./action";
import { StudentSection } from "@prisma/client";

const Page = () => {
  const {
    data: sections,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-sections-key"],
    queryFn: async () => await getSections(),
    retry: true,
    retryDelay: 500,
  });

  const { data: students } = useQuery({
    queryKey: ["get-students-key"],
    queryFn: async () => await getStudents(),
    retry: true,
    retryDelay: 500,
  });

  const { data: studentSections } = useQuery({
    queryKey: ["get-student-sections-key"],
    queryFn: async () => await getStudentSections(),
    retry: true,
    retryDelay: 500,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading sections.</div>;
  }

  return (
    <div>
      <h1>Student Management</h1>
      <CreateStudent />
      <h1>Section Management</h1>
      <CreateSection />
      <Table>
        <TableCaption>A list of sections.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Section Name</TableHead>
            <TableHead>Teacher Id</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sections?.map((section: Section) => (
            <TableRow key={section.id}>
              <TableCell>{section.sectionName}</TableCell>
              <TableCell>{section.teacherId}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table>
        <TableCaption>A list of students.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Section ID/s</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student: Student) => (
            <TableRow key={student.id}>
              <TableCell>{student.firstName} {student.lastName}</TableCell>
              <TableCell>{studentSections?.map((section: StudentSection) => section.sectionId)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;
