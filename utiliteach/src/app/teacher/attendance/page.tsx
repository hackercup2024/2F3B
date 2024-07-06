"use client";
import { useState } from "react";
import QrReader from "./QRCodeReader";

const Attendance = () => {
  return (
    <>
      <div className="flex flex-grow justify-center items-center">
        <QrReader />
      </div>
    </>
  );
};

export default Attendance;
