"use client";
import { useState } from "react";
import QrReader from "./QRCodeReader";

const Attendance = ({ params }: { params: { sessionId: number } }) => {
  const [sessionId, setSessionId] = useState(params.sessionId);
  return (
    <>
      Attendance
      <QrReader sessionId={sessionId} />
    </>
  );
};

export default Attendance;
