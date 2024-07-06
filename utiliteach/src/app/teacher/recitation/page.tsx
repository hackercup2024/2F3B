"use client";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { useState, useEffect } from "react";
import { getAttendanceBySession } from "./action";
import { getStudentByStudentId } from "./action";
import { Student, Attendance } from "@prisma/client";


const Teachers = () => {
    const [attendances, setAttendances] = useState<Attendance[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [sessionId, setSessionId] = useState("");
    const [randomizedStudent, setRandomizedStudent] = useState<Student | null>(null);
    
    // fetch students by sectionId
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const attendances = await getAttendanceBySession({ sessionId: parseInt(sessionId) });
        setAttendances(attendances);
        const students = await Promise.all(attendances.map(async (attendance) => {
          const student = await getStudentByStudentId({ studentId: attendance.studentId });
          return student[0];
        }));
        // console.log(students);
        setStudents(students);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const handleRandomize = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        const randomIndex = Math.floor(Math.random() * students.length);
        setRandomizedStudent(students[randomIndex]);
      } catch (error) {
        console.error("Error randomizing students:", error);
      }
    };


  

  return (
    <div className="flex flex-grow flex-col items-center p-4">
      <div className="flex justify-center sm:justify-start">
          <h1 className="text-lapis font-bold text-3xl ml-1 mb-4"> Recitation Picker</h1>
      </div>
      <form className="flex flex-col sm:flex-row w-1/2 gap-x-2 items-center justify-center" onSubmit={handleSubmit}>
        <div>
          <p className="ml-1">Session ID</p>
          <Input type="text" placeholder="Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)}/>
        </div>
        <div className="flex mt-4 items-center justify-center">
          <Button className="mt-1.5" type="submit">Enter Session ID</Button>
        </div>
      </form>
      <div className="w-full mt-4 md:w-3/4">
        <Table>
          <TableCaption>List of Students in the class</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Student Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students?.map((student) => (
              <TableRow key={student.id}>
                <TableCell className="text-center">{student.firstName} {student.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-center">
          <form onSubmit={handleRandomize}>
            <Button type="submit">Randomize</Button>
          </form>
        </div>
        <h1 className="mt-4 justify-self-center">Randomized Student: {randomizedStudent?.firstName} {randomizedStudent?.lastName}</h1>
      </div>
    </div>
  );
};

export default Teachers;