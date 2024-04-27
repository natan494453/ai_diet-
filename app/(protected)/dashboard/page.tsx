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
  const user = await currentUser();

  const data = await prisma.recipe.findMany({
    where: { userId: user?.emailAddresses[0].id },
    orderBy: { createdAt: "desc" },
  });
  const count = await prisma.recipe.aggregate({
    _count: {
      userId: true,
    },
    where: {
      userId: user?.emailAddresses[0].id,
    },
  });
  const countFav = await prisma.recipe.aggregate({
    _count: {
      isFavorite: true,
    },
    where: {
      AND: {
        userId: user?.emailAddresses[0].id,
      },
      isFavorite: true,
    },
  });
  console.log(countFav._count.isFavorite);
  return (
    <div className=" ">
      <Stats
        count={count._count.userId}
        countFav={countFav._count.isFavorite}
      />
      <div className="border-b-2 border-[#f1f1f15b]">
        <Chat />
      </div>{" "}
      <div className="border-b-2 border-[#f1f1f15b]">
        <Accordion dataa={data} />
      </div>
    </div>
  );
}
