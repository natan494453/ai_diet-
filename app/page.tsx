import Hero from "@/views/Hero/Hero";
import prisma from "@/db/connect";
export default async function Home() {
  return (
    <main className=" ">
      <Hero />
    </main>
  );
}
