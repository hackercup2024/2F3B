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
import { Loading } from "@/components/Loading";

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
        return <Loading />;
    }

    if (isError) {
        return <div>Error loading sections.</div>;
    }

    return (
        <div className="flex flex-grow flex-col items-center p-4">
            <div className="flex flex-row max-sm:flex-col gap-6">
                <div>
                    <div className="flex justify-center sm:justify-start">
                        <h1 className="text-lapis font-bold text-3xl mb-4">Student Management</h1>
                    </div>
                    <CreateStudent />
                </div>
                <div>
                    <div className="flex justify-center sm:justify-start">
                        <h1 className="text-lapis font-bold text-3xl mb-4">Section Management</h1>
                    </div>
                    <CreateSection />
                </div>
            </div>
            <div className="w-full md:w-3/4">
                <Table>
                    <TableCaption>A list of sections.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Section Name</TableHead>
                            <TableHead className="text-center">Teacher Id</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sections?.map((section: Section) => (
                            <TableRow key={section.id}>
                                <TableCell className="text-center">{section.sectionName}</TableCell>
                                <TableCell className="text-center">{section.teacherId}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Table>
                    <TableCaption>A list of students.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="text-center">Name</TableHead>
                            <TableHead className="text-center">Section/s</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {students?.map((student: Student) => (
                            <TableRow key={student.id}>
                                <TableCell className="text-center">{student.firstName} {student.lastName}</TableCell>
                                <TableCell className="text-center">{studentSections?.map((section: StudentSection) => {
                                    const sectionName = sections?.find(s => s.id === section.sectionId)?.sectionName;
                                    return sectionName || 'Unknown';
                                })}</TableCell>
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
