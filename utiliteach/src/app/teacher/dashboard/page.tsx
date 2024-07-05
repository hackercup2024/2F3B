"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button";
import { useState } from "react"

const Dashboard = () => {

  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSection, setSelectedSection] = useState<string>('');

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
        <Select onValueChange={e => setSelectedSection(e)} disabled={selectedClass === ''}>
          <SelectTrigger className="w-[280px]">
            <SelectValue placeholder="Select a Section" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="art">Argentina Time (ART)</SelectItem>
            <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
            <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
            <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
          </SelectContent>
        </Select>
        <Button className="w-full text-black bg-white border border-black" disabled={selectedSection === ''}>Start Class</Button>
      </div>
      <div className="w-fit flex max-md:flex-col max-md:items-center md:justify-center gap-3">
      </div>
    </div>
  )
}

export default Dashboard;
