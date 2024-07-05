/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react"
import { getAttendanceTally, getSectionBySubject, getSubjects, startSession } from "./action";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Section, Subject } from "@prisma/client";

const Dashboard = () => {

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [selectedClass, setSelectedClass] = useState<number>(-1);
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  const [subjectLoading, setSubjectLoading] = useState<boolean>(false);
  const [sectionLoading, setSectionLoading] = useState<boolean>(false);

  let attendanceTally: { studentId: number; firstName: string; lastName: string; totalAttendance: number; }[] = []

  const attendanceTallySample = [
    { studentId: 1, firstName: "John", lastName: "Doe", totalAttendance: 15 },
    { studentId: 2, firstName: "Jane", lastName: "Smith", totalAttendance: 18 },
    { studentId: 3, firstName: "Alice", lastName: "Johnson", totalAttendance: 20 },
    { studentId: 4, firstName: "Bob", lastName: "Brown", totalAttendance: 17 },
    { studentId: 5, firstName: "Charlie", lastName: "Davis", totalAttendance: 16 },
    { studentId: 6, firstName: "Diana", lastName: "Evans", totalAttendance: 19 },
    { studentId: 7, firstName: "Ethan", lastName: "Foster", totalAttendance: 14 },
    { studentId: 8, firstName: "Fiona", lastName: "Garcia", totalAttendance: 21 },
    { studentId: 9, firstName: "George", lastName: "Harris", totalAttendance: 22 },
    { studentId: 10, firstName: "Hannah", lastName: "Martinez", totalAttendance: 13 }
  ];

  useEffect(() => {
    const fetchSubjects = async () => {
      setSubjectLoading(true);
      await getSubjects()
        .then(
          data => {
            setSubjects(data);
            setSubjectLoading(false);
          }
        )
    }

    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedClass === -1) return;

    const fetchSections = async () => {
      setSectionLoading(true);
      await getSectionBySubject({ subjectId: selectedClass })
        .then(
          data => {
            setSections(data);
            setSectionLoading(false);
          }
        )
    }

    fetchSections();

  }, [selectedClass]);

  useEffect(() => {
    const fetchAttendanceTally = async () => {
      attendanceTally = await getAttendanceTally({ sectionId: selectedSection })
    }

    if (selectedSection === -1) return;
    fetchAttendanceTally();

  }, [selectedSection]);

  const onStartClick = async () => {
    await startSession({ sectionId: selectedSection })
      .then(
        data => {
          console.log(data);
        }
      )
  }

  return (
    <div className="flex flex-grow flex-col items-center p-4 gap-3">
      <h1 className="text-lapis text-3xl font-bold">Dashboard</h1>
      <div className="w-fit flex max-md:flex-col max-md:items-center md:justify-center gap-3">
        <Select onValueChange={e => setSelectedClass(parseInt(e))} disabled={subjectLoading}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a Subject" />
          </SelectTrigger>
          <SelectContent>
            {
              subjects.map((subject, index) => (
                <SelectItem key={index} value={subject.id.toString()}>{ subject.name }</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Select onValueChange={e => setSelectedSection(parseInt(e))} disabled={selectedClass === -1 || sectionLoading}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a Section" />
          </SelectTrigger>
          <SelectContent>
            {
              sections.map((section, index) => (
                <SelectItem key={index} value={section.id.toString()}>{ section.sectionName }</SelectItem>
              ))
            }
          </SelectContent>
        </Select>
        <Button className="w-full" type="submit" onClick={() => onStartClick()} disabled={selectedSection === -1}>Start Class</Button>
      </div>
      <div className="w-full md:w-3/4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="md:hidden">Full Name</TableHead>
              <TableHead className="max-md:hidden">Last Name</TableHead>
              <TableHead className="max-md:hidden">First Name</TableHead>
              <TableHead className="text-end">Total Attendance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              selectedSection !== -1 && attendanceTallySample.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="md:hidden">{ item.lastName + ', ' + item.firstName }</TableCell>
                  <TableCell className="max-md:hidden">{ item.lastName }</TableCell>
                  <TableCell className="max-md:hidden">{ item.firstName }</TableCell>
                  <TableCell className="text-end">{ item.totalAttendance }</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default Dashboard;
