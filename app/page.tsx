import Hero from "@/views/Hero/Hero";
import Explain from "@/views/Explain/Explain";
import prisma from "@/db/connect";
export default async function Home() {
  return (
    <main className=" ">
      <Hero />
      <Explain />
    </main>
  );
}
