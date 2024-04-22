import Chat from "@/services/chat/Chat";
import Stats from "@/components/StatsCard/Stats";
import Accordion from "@/components/Accordion/Accordion";
import prisma from "@/db/connect";
import { auth, currentUser } from "@clerk/nextjs/server";
//asc
export default async function page() {
  const user = await currentUser();

  const data = await prisma.recipe.findMany({
    where: { userId: user.emailAddresses[0].id },
  });

  return (
    <div className=" ">
      <Stats />
      <div className="border-b-2 border-[#f1f1f15b]">
        <Chat />
      </div>{" "}
      <div className="border-b-2 border-[#f1f1f15b]">
        <Accordion data={data} />
      </div>
    </div>
  );
}
