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
import { getSectionByTeacherId } from "./action";
import { Section } from "@prisma/client";

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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading sections.</div>;
  }

  return (
    <div>
      <h1>Subject Management</h1>
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
          {/* {sections?.map((section: Section) => (
            <TableRow key={section.id}>
              <TableCell>{section.sectionName}</TableCell>
              <TableCell>{section.teacherId}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default Page;