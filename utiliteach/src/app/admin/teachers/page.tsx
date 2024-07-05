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
    return <Loading />;
  }

  if (isError) {
    return <div>Error loading teachers.</div>;
  }

  return (
    <div className="flex flex-grow flex-col items-center p-4">
      <div className="flex justify-center sm:justify-start">
        <h1 className="text-lapis font-bold text-3xl mb-4">Teacher Management</h1>
      </div>
        <CreateTeacher />
      <div className="mt-4 w-full md:w-3/4">
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
    </div>
  );
};

export default Teachers;