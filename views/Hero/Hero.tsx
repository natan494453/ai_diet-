import ChatHero from "@/components/ChatHero/ChatHero";
export default function Hero() {
  return (
    <div className=" he ">
      <div className=" flex justify-center flex-col items-center  text-9xl font-bold mt-20">
        <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
          המתכון המשולם בעזרת
        </h2>
        <h3 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
          AI
        </h3>
      </div>
      <ChatHero />
    </div>
  );
}
