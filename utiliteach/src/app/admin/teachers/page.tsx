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
import { getTeachers } from "./action";
import CreateTeacher from "./createTeacher";


const Teachers = () => {
  const {
    data: teachers,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["get-teachers-key"],
    queryFn: async () => await getTeachers(),
    retry: true,
    retryDelay: 500,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading teachers.</div>;
  }

  return (
    <div>
      <CreateTeacher />
      <h1>Teacher Management</h1>
      <Table>
        <TableCaption>A list of teachers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Middle Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Suffix</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teachers?.map((teacher) => (
            <TableRow key={teacher.id}>
              <TableCell>{teacher.email}</TableCell>
              <TableCell>{teacher.firstName}</TableCell>
              <TableCell>{teacher.middleName}</TableCell>
              <TableCell>{teacher.lastName}</TableCell>
              <TableCell>{teacher.Suffix}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Teachers;