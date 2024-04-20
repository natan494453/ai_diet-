import Hero from "@/views/Hero/Hero";
import prisma from "@/db/connect";
export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users);

  return (
    <main>
      <Hero />
    </main>
  );
}
