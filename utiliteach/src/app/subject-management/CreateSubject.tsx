"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSubject } from "./action";

const CreateSubject = () => {
  const [subjectName, setSubjectName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createSubject({
        name: subjectName,
        gradeLevel: parseInt(gradeLevel),
      });
      alert("Subject created successfully!");
    } catch (error) {
      console.error("Error creating subject:", error);
      alert("Failed to create subject.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e) => setSubjectName(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Grade Level"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
        />
        <Button type="submit">Create Subject</Button>
      </form>
    </div>
  );
};

export default CreateSubject;
