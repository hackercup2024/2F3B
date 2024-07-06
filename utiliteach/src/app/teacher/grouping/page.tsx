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
    <div className="flex flex-grow flex-col items-center p-4">
      <div className="flex justify-center sm:justify-start">
          <h1 className="text-lapis font-bold text-3xl ml-1 mb-4"> Randomize Groupings</h1>
      </div>
      <form className="flex flex-col sm:flex-row w-1/2 gap-x-2" onSubmit={handleSubmit}>
        <div>
          <p className="ml-1">Session ID</p>
          <Input type="text" placeholder="Session ID" value={sessionId} onChange={(e) => setSessionId(e.target.value)}/>
        </div>
        <div className="flex mt-4 items-center justify-center">
            <Button className="mt-1.5" type="submit">Enter Session ID</Button>
        </div>
      </form>
      <form className="flex flex-col sm:flex-row w-1/2 mt-4 gap-x-2" onSubmit={handleRandomize}>
        <div>
          <p>Group Size</p>
          <Input type="number" placeholder="How many members in a group?" value={groupSize} onChange={(e) => setGroupSize(parseInt(e.target.value))}/>
        </div>
        <div className="flex mt-4 items-center justify-center">
            <Button className="mt-1.5" type="submit">Randomize</Button>
        </div>
      </form>
      <div className="w-full mt-4 md:w-1/3">
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
                <TableCell>{student.firstName} {student.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <h1 className="mt-4">Randomized Student Groups:</h1>
      {randomizedStudentGroups.map((group, index) => (
        <div key={index}>
          <h2 className="text-lapis font-semibold">Group {index + 1}:</h2>
          <Table>
            <TableCaption className="text-center">Members of Group {index + 1}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Student Name</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group?.map((student) => (
                <TableRow key={student?.id}>
                  <TableCell className="text-center">{student?.firstName} {student?.lastName}</TableCell>
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