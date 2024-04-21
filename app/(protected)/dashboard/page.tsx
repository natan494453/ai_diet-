import Chat from "@/services/chat/Chat";
import Stats from "@/components/StatsCard/Stats";
export default function page() {
  return (
    <div className=" ">
      <Stats />
      <div className="border-b-2 border-[#f1f1f15b]">
        <Chat />
      </div>
    </div>
  );
}
