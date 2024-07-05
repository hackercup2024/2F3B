"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createSection } from "./action";

const CreateSection = () => {
  const [sectionName, setSectionName] = useState("");
  const [teacherId, setTeacherId] = useState("");  

  const handleSubmit = async (e: React.FormEvent) => {    
    e.preventDefault();    
    try {      
      await createSection({        
        sectionName: sectionName,        
        teacherId: teacherId,      
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
        <Input          
          type="number"          
          placeholder="Teacher Id"          
          value={teacherId}          
          onChange={(e) => setTeacherId(e.target.value)}        
        />        
        <Button type="submit">Create Section</Button>      
      </form>    
    </div>    
  );    
};

export default CreateSection;
