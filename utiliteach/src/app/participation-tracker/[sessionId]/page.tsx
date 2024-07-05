"use client"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useEffect, useState } from "react"

export default function Page({params} : {params: {sessionId: any}}) {

    useEffect(() => {
        fetch(`/api/participation/${params.sessionId}`, 
            {
                method: "GET"
            }
        )
            .then(res => res.json())
            .then(data => {
                setSession(data);
            }).catch(err => console.log(err))
        setAsLoaded(true);
    }, []);

    // const [sessionId, setSessionId] = useState(params.sessionId);
    const [session, setSession] = useState();
    const [isLoaded, setAsLoaded] = useState(false);

    function Terminate(){
        // close session, redirect to participation-tracker

        if (!session){
            return;
        }

        let successTerminate = false;

        fetch(`/api/participation/${params.sessionId}`,
            {
                method: 'DELETE'
            }
        ).then(res => {
            if (res.status === 200){
                successTerminate = true;
            }
        })

        if (successTerminate){
            window.location.replace("/participation-tracker");
        }
        
        return;
    }

    async function GivePoint(sno:number){
        
        fetch(`/api/participation?sid=${session.id}&sno=${sno}&sesid=${params.sessionId}`,
            {
                method: "PATCH"
            }
        )
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
            
        return;
    }

    const [students, setStudents] = useState([
        {
            id: 1,
            firstName: "Juan",
            lastName: "Dela Cruz",
            lrn: "0123456789",
            points: 0
        },
        {
            id: 2,
            firstName: "Juan",
            lastName: "Dela Cruz",
            lrn: "0123456789",
            points: 0
        }
    ]);

    if (!session){
        return <></>;
    }

    
    if (isLoaded){
        
        if (session.isFinished){
            window.location.replace("/participation-tracker")
            return;
        }

        return (
            <div className="h-screen flex flex-col gap-5 justify-center items-center">
                <h1 className="block text-4xl font-semibold">Participation Tracker</h1>
                <div className="mx-auto w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 flex flex-col gap-3">
                    {
                        students.map((student, index) => (
                            <Card key={index} className="py-4">
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
                                    <button onClick={() => GivePoint(student.id)} className="w-16">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </button>
                                </CardContent>
                            </Card>
                        ))
                    }
                </div>
                <button onClick={Terminate} className="max-auto w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 py-1.5 bg-red-500 text-slate-100 font-semibold text-lg rounded-lg">Terminate</button>
            </div>
        )
    }
}