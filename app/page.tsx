import Hero from "@/views/Hero/Hero";
import Explain from "@/views/Explain/Explain";
import Footer from "@/views/footer/Footer";
export default async function Home() {
  return (
    <main className="bg-[red] ">
      <Hero />
      <Explain />
      <Footer />
    </main>
  );
}
