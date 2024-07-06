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
    <div>
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)}/>
      <Button type="submit">Enter Session ID</Button>
    </form>
      <h1>Teacher Management</h1>
      <Table>
        <TableCaption>List of Students in the class</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Student Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students?.map((student) => (
            <TableRow key={student.id}>
              <TableCell>{student.firstName} {student.lastName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <form onSubmit={handleRandomize}>
        <Button type="submit">Randomize</Button>
      </form>
      <h1>Randomized Student: {randomizedStudent?.firstName} {randomizedStudent?.lastName}</h1>
      
    </div>
  );
};

export default Teachers;