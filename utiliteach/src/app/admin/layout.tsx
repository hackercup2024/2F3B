"use client"
import "../globals.css";
import { constructMetaData } from "@/lib/utils";
import Tabs from "@/components/ui/tabs";
import { LucideBook, LucideBookUser, LucideFile, LucideUsersRound } from "lucide-react";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { useEffect } from "react";
import { notFound } from "next/navigation";

// export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    async function protect() {
      const {getUser} = getKindeServerSession();
      const user = await getUser();

      if (!user) return notFound();
    }
  }, [])
  const links = [
    {link: '/admin/teachers', icon: <LucideBookUser />, label: "Teachers"},
    {link: '/admin/subjects', icon: <LucideBook />, label: "Subjects"},
    {link: '/admin/classes', icon: <LucideUsersRound />, label: "Sections"},
    {link: '/admin/reports', icon: <LucideFile />, label: "Reports"},
  ]

  return (
    <>
      {children}
      <Tabs links={links} />
    </>
  );
}

