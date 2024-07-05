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

const Dashboard = () => {

  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<number>(-1);
  let attendanceTally: { studentId: number; firstName: string; lastName: string; totalAttendance: number; }[] = []

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
        <Button className="w-full text-black bg-white border border-black" disabled={selectedSection === -1}>Start Class</Button>
      </div>
      <div className="w-fit flex max-md:flex-col max-md:items-center md:justify-center gap-3">
      </div>
    </div>
  )
}

export default Dashboard;
