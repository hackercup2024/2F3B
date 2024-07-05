import "../globals.css";
import { constructMetaData } from "@/lib/utils";
import Tabs from "@/components/ui/tabs";
import { LucideBook, LucideBookUser, LucideFile, LucideUsersRound } from "lucide-react";

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

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

