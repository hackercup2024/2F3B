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
    const [groupSize, setGroupSize] = useState(1);
    const [randomizedStudentGroups, setRandomizedStudentGroups] = useState<Student[][]>([]);
    
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
      const shuffledStudents = [...students];
      
      // Shuffle the students array
      for (let i = shuffledStudents.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledStudents[i], shuffledStudents[j]] = [shuffledStudents[j], shuffledStudents[i]];
      }

      // Split students into groups
      const groupedStudents: Student[][] = [];
      for (let i = 0; i < shuffledStudents.length; i += groupSize) {
        groupedStudents.push(shuffledStudents.slice(i, i + groupSize));
      }

      setRandomizedStudentGroups(groupedStudents);  
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
        <Input type="number" placeholder="Group Size" value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value))}/>
        <Button type="submit">Randomize</Button>
      </form>
      <h1>Randomized Student Groups:</h1>
      {randomizedStudentGroups.map((group, index) => (
        <div key={index}>
          <h2>Group {index + 1}:</h2>
          <Table>
            <TableCaption>List of Students in Group {index + 1}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group?.map((student) => (
                <TableRow key={student?.id}>
                  <TableCell>{student?.firstName} {student?.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};

export default Teachers;