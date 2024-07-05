"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button } from "@/components/ui/button";
// import Phone from "@/components/Phone";
// import Reviews from "@/components/Reviews";
// import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Check, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [qnaCode, setqnaCode] = useState("");
  return (
    <div className="bg-slate-50">
      <section>
        <MaxWidthWrapper
          className="pb-16 pt-10 sm:pb-16 lg:grid lg:grid-cols-3 lg:gap-x-0 lg:pb-52 lg:pt-16
            xl:gap-x-8 xl:pt-16"
        >
          <div className="col-span-2 px-6 lg:px-0 lg:pt-4">
            <div
              className="relative mx-auto flex flex-col items-center text-center lg:items-start
                lg:text-left"
            >
              <h1
                className="relative w-fit text-balance text-5xl font-bold !leading-tight
                  tracking-tight text-gray-900 md:text-6xl lg:text-7xl"
              >
                Your all in one <span> </span>
                <span className="bg-lapis px-2 text-white">utility kit</span> for teaching.
              </h1>
              <p
                className="mt-8 max-w-prose text-balance text-center text-lg md:text-wrap lg:pr-10
                  lg:text-left"
              >
                The tool towards <span className="font-semibold">quality education</span>.
              </p>
              <ul className="mt-8 flex flex-col items-center space-y-2 text-left font-medium sm:items-start">
                <div className="space-y-2">
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-lapis" />
                    Streamline student attendance
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-lapis" />
                    Randomize recitation 
                  </li>
                  <li className="flex items-center gap-1.5 text-left">
                    <Check className="h-5 w-5 shrink-0 text-lapis" />
                    Summarize student questions
                  </li>
                </div>
              </ul>
            </div>
          </div>

          <div
            className="col-span-full mt-12 flex h-fit w-full justify-center px-8 sm:px-16 md:px-0
              lg:col-span-1 lg:mx-0"
          >
            <div>
              <p className='text-3xl mb-5 lg:pr-10 max-w-prose text-center lg:text-left text-balance md:text-wrap'>
                Are you a 
                <span className='text-lapis font-semibold'> student</span>?
              </p>
              <form>
                <Input
                  type="text"
                  placeholder="Enter your QnA Code here!"
                  value={qnaCode}
                  onChange={(e) => setqnaCode(e.target.value)}
                  className="md:h-12"
                />
                <Button type="submit">Enter Code</Button>
              </form>              
            </div>
          </div>


        </MaxWidthWrapper>
      </section>
    </div>
  );
}
