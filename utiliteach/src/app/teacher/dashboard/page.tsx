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
import { getAttendanceTally } from "./action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tab } from "@headlessui/react";

const Dashboard = () => {

  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<number>(-1);
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
    if (selectedSection === -1) return;
    fetchAttendanceTally();
    console.log(attendanceTally);
  }, [selectedSection]);

  const fetchAttendanceTally = async () => {
    attendanceTally = await getAttendanceTally({ sectionId: selectedSection })
  }

  return (
    <div className="flex flex-grow flex-col items-center p-4 gap-3">
      <h1 className="text-lapis text-3xl font-bold">Dashboard</h1>
      <div className="w-fit flex max-md:flex-col max-md:items-center md:justify-center gap-3">
        <Select onValueChange={e => setSelectedClass(e)}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={e => setSelectedSection(parseInt(e))} disabled={selectedClass === ''}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Argentina Time (ART)</SelectItem>
            <SelectItem value="1">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="2">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="3">Chile Standard Time (CLT)</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full" disabled={selectedSection === -1}>Start Class</Button>
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
              attendanceTallySample.map((item, index) => (
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
