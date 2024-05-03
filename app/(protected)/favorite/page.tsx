import React from "react";
import Fav from "@/views/favView/Fav";
import prisma from "@/db/connect";
import { auth, currentUser } from "@clerk/nextjs/server";

export const dynamic = "force-dynamic";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "מועדפים",
  description: "מתכונים",
};
import { api } from "@/convex/_generated/api";
export default async function page() {
  const user = await currentUser();

  return (
    <div>
      <h2 className="text-8xl  text-center">מועדפים</h2>

      <Fav user={user?.emailAddresses[0].id} />
    </div>
  );
}
