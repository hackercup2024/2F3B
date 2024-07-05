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
      <form className="flex flex-col sm:space-x-12 sm:flex-row" onSubmit={handleSubmit}>
        <div className="mb-4">
          <p className="ml-1">Subject Name</p>
          <Input
            type="text"
            placeholder="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <p className="ml-1">Grade Level</p>
          <Input
            type="number"
            placeholder="Grade Level"
            value={gradeLevel}
            onChange={(e) => setGradeLevel(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <Button type="submit">Create Subject</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubject;
