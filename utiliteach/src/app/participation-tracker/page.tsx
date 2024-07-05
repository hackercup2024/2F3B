"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { redirect } from "next/navigation"


export default function Page(){

    const [sections, setSections] = useState([]);
    const [teacherId, setTeacherId] = useState("kp_b32d921f8e644b1aaab1a8039c6d9645");
    const [selectedSection, setSelectedSection] = useState(undefined);
    const [isLoading, setAsLoading] = useState(true);

    // const selectedSectionId = useState(undefined);

    useEffect(() => {
        fetch(`/api/participation?tid=${teacherId}`, {
            method: 'GET'
        }).then(
            res => res.json()
        ).then(data => {
            console.log(data);
            setSections(data);
            if (data.length !== 0){
                setSelectedSection(data[0].id);
            }
        })
        setAsLoading(false);
    }, [])

    function startSession() {
        let successSession = false;
        let sessionId = undefined;
        
        // check if selection id is present
        if (!selectedSection) {
            return;
        }

        // start session
        fetch(`/api/participation?sid=${selectedSection}`, {
            method: "POST",
        }).then(res => {
            if (res.status === 200){
                successSession = true;
                // sessionId = selectedSection; // set
            }
        });

        if (successSession){
            // redirect to session
            redirect(`/participation-tracker/${sessionId}`);
        }
        return;
    }

    function test(){
        console.log(selectedSection);
    }

    if (!isLoading){
    return (
        <main className="h-screen flex flex-col gap-5 justify-center items-center">
            <h1 className="block text-4xl font-semibold">Participation Tracker</h1>
            <Popover>
                <PopoverTrigger>
                <button className="bg-yellow-400 font-semibold text-white px-8 py-2 text-xl rounded-md">New Session</button>
                </PopoverTrigger>
                <PopoverContent>
                    <p className="mb-2">Are you sure to select this class?</p>
                    <div className="flex justify-center gap-1">
                        <button onClick={startSession} className="bg-green-500 text-slate-100 w-2/5 py-1 rounded-sm text-lg">Yes</button>
                        <button onClick={test} className="bg-red-500 text-slate-100 w-2/5 py-1 rounded-sm text-lg">No</button>
                    </div>
                </PopoverContent>
            </Popover>
            <select className="py-1.5 text-lg indent-3 w-3/4 md:w-1/2 lg:w-2/5 xl:w-1/4" defaultValue={selectedSection} onChange={(e) => setSelectedSection(parseInt(e.target.value))}>
                {
                    sections.map(sc => <option className="py-2" value={sc.id}>{sc.sectionName}</option>)
                }
            </select>
        </main>
    )
    }
    else {
        return (
            <>
            </>
        )
    }
}