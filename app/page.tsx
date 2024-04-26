import Hero from "@/views/Hero/Hero";
import Explain from "@/views/Explain/Explain";
import Footer from "@/views/footer/Footer";
export default async function Home() {
  return (
    <main className="lg:mt-[8%] mt-[30%] ">
      <Hero />
      <Explain />
      <Footer />
    </main>
  );
}
