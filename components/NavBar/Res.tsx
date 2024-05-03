"use client";
import React, { useState } from "react";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export default function Res() {
  const [isHam, setIsHam] = useState(false);
  return (
    <div className=" lg:hidden ">
      <div>
        <button
          onClick={() => {
            setIsHam((prev) => !prev);
          }}
          className="btn btn-square btn-ghost "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>{" "}
        <div className=" absolute top-1/2 translate-y-[-50%] left-16">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      <div
        className={`   absolute  bg-base-300  left-0 top-16 w-screen duration-1000   ${
          isHam ? "h-[100px] opacity-100 z-[50]" : "h-[60px] opacity-0 z-[-5]"
        }  `}
      >
        <div>
          <SignedIn>
            <div className=" text-xl flex flex-col gap-5 items-end pl-10 ">
              <Link href={"/dashboard"}>
                <p>מתכונים</p>
              </Link>
              <Link href={"/fav"}>
                <p>מועדפים</p>
              </Link>
            </div>
          </SignedIn>
        </div>
      </div>
    </div>
  );
}
