import Chat from "@/services/chat/Chat";
import Stats from "@/components/StatsCard/Stats";
import Accordion from "@/components/Accordion/Accordion";
import prisma from "@/db/connect";
import { auth, currentUser } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";

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
  return (
    <div className="max-lg:mt-[20%] lg:mt-[3.5%] ">
      <Stats count={count._count.userId} />
      <div className="border-b-2 border-[#f1f1f15b]">
        <Chat />
      </div>{" "}
      <div className="border-b-2 border-[#f1f1f15b]">
        <Accordion dataa={data} />
      </div>
    </div>
  );
}
