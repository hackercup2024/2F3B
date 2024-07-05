"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createTeacher } from "./action";

const CreateTeacher = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [Suffix, setSuffix] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTeacher({
        email: email,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        Suffix: Suffix,
      });
      alert("Teacher created successfully!");
    } catch (error) {
      console.error("Error creating teacher:", error);
      alert("Failed to create teacher.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
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
        <Button type="submit">Create Teacher</Button>
      </form>
    </div>
  );
};

export default CreateTeacher;