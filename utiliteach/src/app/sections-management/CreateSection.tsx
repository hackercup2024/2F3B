"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSection } from "./action";
import { getTeachers } from "./action";
import { useQuery } from "@tanstack/react-query";
import { Select } from "@headlessui/react";
import { getSubjects } from "./action";

const CreateSection = () => {
  const [sectionName, setSectionName] = useState("");
  const [teacherId, setTeacherId] = useState("");  
  const [subjectId, setSubjectId] = useState(0);

  const { data: teachers } = useQuery({
    queryKey: ["get-teachers-key"],
    queryFn: async () => await getTeachers(),
    retry: true,
    retryDelay: 500,
  });

  const { data: subjects } = useQuery({
    queryKey: ["get-subjects-key"],
    queryFn: async () => await getSubjects(),
    retry: true,
    retryDelay: 500,
  });

  useEffect(() => {
    if (teachers && teachers.length > 0) {
      setTeacherId(teachers[0].id);
    }
  }, [teachers]);

  useEffect(() => {
    if (subjects && subjects.length > 0) {
      setSubjectId(subjects[0].id);
    }
  }, [subjects]);

  const handleSubmit = async (e: React.FormEvent) => {    
    e.preventDefault();    
    console.log(teacherId);
    console.log(subjectId);
    console.log(sectionName);
    try {      
      await createSection({        
        sectionName: sectionName,        
        teacherId: teacherId,
        subjectId: subjectId,
      });      
      alert("Section created successfully!");    
    } catch (error) {      
      console.error("Error creating section:", error);      
      alert("Failed to create section.");    
    }    
  };
  return (    
    <div>      
      <form onSubmit={handleSubmit}>        
        <Input          
          type="text"          
          placeholder="Section Name"          
          value={sectionName}          
          onChange={(e) => setSectionName(e.target.value)}        
        />
        <Select defaultValue={teacherId} onChange={(e) => setTeacherId(e.target.value)}>
          {teachers?.map((teacher) => (
            <option key={teacher.id} value={teacher.id}>
              {teacher.firstName} {teacher.lastName} {teacher.id}
            </option>
          ))}
        </Select>

        <Select defaultValue={subjectId} onChange={(e) => setSubjectId(parseInt(e.target.value))}>
          {subjects?.map((subject) => (
            <option key={subject.id} value={subject.id}>
              {subject.name} {subject.id}
            </option>
          ))}
        </Select>
             
        <Button type="submit">Create Section</Button>      
      </form>    
    </div>    
  );    
};

export default CreateSection;
