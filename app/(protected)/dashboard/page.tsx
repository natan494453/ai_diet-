import Chat from "@/services/chat/Chat";
import Stats from "@/components/StatsCard/Stats";
import Accordion from "@/components/Accordion/Accordion";
import prisma from "@/db/connect";
import { auth, currentUser } from "@clerk/nextjs/server";

import type { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "מתכונים",
  description: "מתכונים",
};
export default async function page() {
  const token = (await auth().getToken({ template: "convex" })) ?? undefined;

  const user = await currentUser();

  return (
    <div className=" ">
      <Stats />
      <div className="border-b-2 border-[#f1f1f15b]">
        <Chat token={token} />
      </div>{" "}
      <div className="border-b-2 border-[#f1f1f15b]">
        <Accordion token={token} />
      </div>
    </div>
  );
}
