import "../globals.css";
import { constructMetaData } from "@/lib/utils";
import Tabs from "@/components/ui/tabs";
import { LucideFileQuestion, LucideHand, LucideUserCheck, LucideUsersRound } from "lucide-react";

export const metadata = constructMetaData();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const links = [
    {link: '/teacher/attendance', icon: <LucideUserCheck />, label: "Attendance"},
    {link: '/teacher/recitation', icon: <LucideHand />, label: "Recitation"},
    {link: '/teacher/question', icon: <LucideFileQuestion />, label: "Question"},
    {link: '/teacher/grouping', icon: <LucideUsersRound />, label: "Grouping"},
  ]

  return (
    <>
      {children}
      <Tabs links={links} />
    </>
  );
}

