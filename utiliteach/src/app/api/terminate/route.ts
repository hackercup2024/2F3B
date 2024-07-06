import { endSession } from "@/app/teacher/dashboard/action";
import { NextApiRequest } from "next";
import { permanentRedirect } from "next/navigation";

export async function GET(req: NextApiRequest) {
  endSession();
  permanentRedirect('/teacher/dashboard');
}
