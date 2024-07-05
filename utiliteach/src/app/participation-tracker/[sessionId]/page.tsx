"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { redirect } from "next/navigation";
  

import { useEffect, useState } from "react"

export default function Page({params} : {params: {sessionId: any}}) {

    const [sessionId, setSessionId] = useState(params.sessionId);

    function Terminate(){
        // close session, redirect to participation-tracker

        let successTerminate = false;

        fetch(`/api/participation?sid=${sessionId}`,
            {
                method: 'DELETE'
            }
        ).then(res => {
            if (res.status === 200){
                successTerminate = true;
            }
        })

        if (successTerminate){
            window.location.href = "/participation-tracker";
        }
        
        return;
    }

    const [students, setStudents] = useState([
        {
            firstName: "Juan",
            lastName: "Dela Cruz",
            lrn: "0123456789",
            points: 0
        },
        {
            firstName: "Juan",
            lastName: "Dela Cruz",
            lrn: "0123456789",
            points: 0
        }
    ]);

    useEffect(() => {
        // fetch("",
        //     {
        //         method: "GET"
        //     }
        // )
    }, []); 

    console.log(params.sessionId);

    return (
        <main className="h-screen flex flex-col gap-5 justify-center items-center">
            <h1 className="block text-4xl font-semibold">Participation Tracker</h1>
            <div className="mx-auto w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col gap-3">
                {
                    students.map(student => (
                        <Card className="py-4">
                            {/* <CardHeader>
                                <CardTitle></CardTitle>
                                <CardDescription>Card Description</CardDescription>
                            </CardHeader> */}
                            <CardContent className="flex justify-between items-center py-0">
                                <div>
                                    <h2 className="text-xl font-medium">{student.lastName}, {student.firstName}</h2>
                                    {
                                        student.points === 1 ? 
                                        <p>{student.points} point</p>
                                        :
                                        <p>{student.points} points</p>
                                    }
                                </div>
                                <button className="w-16">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-full h-full">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                    </svg>
                                </button>
                            </CardContent>
                            {/* <CardFooter>
                                <p>Card Footer</p>
                            </CardFooter> */}
                        </Card>
                    ))
                }
            </div>
            <button onClick={Terminate} className="max-auto w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 py-1.5 bg-red-500 text-slate-100 font-semibold text-lg rounded-lg">Terminate</button>
        </main>
    )
}