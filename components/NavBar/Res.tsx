"use client";
import React, { useState } from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function Res() {
  const t = useTranslations("NavBar");
  const [isHam, setIsHam] = useState(false);

  return (
    <div className="lg:hidden relative z-[500]">
      {/* Header */}
      <div className="flex items-center justify-between p-  text-white shadow-md">
        <button
          onClick={() => setIsHam((prev) => !prev)}
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="w-6 h-6"
          >
            <path
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        <div className="ml-5">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-[138%] left-[-40px]  bg-gray-800 text-white rounded-b-md shadow-lg overflow-hidden transform transition-transform duration-300 ${
          isHam
            ? "translate-y-0 opacity-100"
            : "-translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <SignedIn>
          <nav className="flex flex-col divide-y divide-gray-700 z-[500] relative">
            <Link href="/dashboard">
              <div className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer">
                {t("recipes")}
              </div>
            </Link>
            <Link href="/favorite">
              <div className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer">
                {t("favorites")}
              </div>
            </Link>
            <Link href="/recipes">
              <div className="p-4 hover:bg-gray-700 transition duration-200 cursor-pointer">
                {t("all-creations")}
              </div>
            </Link>
          </nav>
        </SignedIn>
      </div>
    </div>
  );
}
