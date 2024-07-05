"use client";
import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createStudent } from "./action";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@headlessui/react";
import { getSections } from "./action";
import { createStudentSection } from "./action";

const CreateStudent = () => {
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Suffix, setSuffix] = useState("");
  const [gradeLevel, setGradeLevel] = useState(0);
  const [lrn, setLrn] = useState("");
  const [sectionId, setSectionId] = useState(0);

  const { data: sections } = useQuery({
    queryKey: ["get-sections-key"],
    queryFn: async () => await getSections(),
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (sections && sections.length > 0) {
      setSectionId(sections[0].id);
    }
  }, [sections]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const student = await createStudent({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        Suffix: Suffix,
        gradeLevel: gradeLevel,
        lrn: lrn,
      });
        try {
            await createStudentSection({
            studentId: student[0].id,
            sectionId: sectionId,
            });
        } catch (error) {
            console.error("Error creating student:", error);
            alert("Failed to create student.");
        }
      alert("Student created successfully!");
    } catch (error) {
      console.error("Error creating student:", error);
      alert("Failed to create student.");
    }

  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Middle Name"
          value={middleName}
          onChange={(e) => setMiddleName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Suffix"
          value={Suffix}
          onChange={(e) => setSuffix(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Grade Level"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(parseInt(e.target.value))}
        />
        <Input
          type="text"
          placeholder="LRN"
          value={lrn}
          onChange={(e) => setLrn(e.target.value)}
        />
        <Select defaultValue={sectionId} onChange={(e) => setSectionId(parseInt(e.target.value))}>
          {sections?.map((section) => (
            <option key={section.id} value={section.id}>
              {section.sectionName} {section.id}
            </option>
          ))}</Select>

        <Button type="submit">Create Student</Button>
      </form>
    </div>
  );
};

export default CreateStudent;