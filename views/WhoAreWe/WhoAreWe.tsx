import React from "react";
import Image from "next/image";
import WhoAreWeCard from "@/components/WhoAreWeCard/WhoAreWeCard";
export default function WhoAreWe() {
  return (
    <div className=" bg-base-300 mt-10 relative pb-10">
      <div className=" relative">
        <h2 className=" text-center font-bold text-xl lg:text-2xl pt-10 text-warning">
          יותר מ 40,000 אלף מתכונים נוצרו
        </h2>
        <h1 className=" text-center text-2xl lg:text-4xl font-bold mt-4">
          יוצר מתכונים בעזרת בינה מלכותית
        </h1>
        <h3 className="text-center mt-4 ">
          קבלו מתכונים משודרגים באמצעות הכוח של המוח המלאכותי!
          <br /> האתר שלנו משתמש בלמידת מכונה כדי ליצור מתכונים ייחודיים
          וטעימים, מתאימים בדיוק לטעמך ולצרכייך. <br /> תכנסו עכשיו כדי לגלות את
          הטעמים החדשים שהמערכת יכולה להציע!
        </h3>
        <div className="flex justify-center mt-5 ">
          <div className="w-[40vw] max-lg:w-screen bg-[#ffffff75] h-[0.5px]"></div>
        </div>
      </div>
      <div>
        <div className=" absolute top-0 left-[15%] max-lg:hidden">
          <Image
            src={"/WhoAreWe/forkBG.png"}
            width={100}
            height={100}
            alt="fork"
          />
        </div>
        <div className=" absolute top-0 right-[15%] max-lg:hidden">
          <Image
            src={"/WhoAreWe/forkBG.png"}
            width={100}
            height={100}
            alt="fork"
          />
        </div>
      </div>
      <div className=" flex justify-center mt-20">
        <div className=" max-lg:w-screen w-[80vw] flex flex-col gap-10">
          <WhoAreWeCard
            iSRev={false}
            alt={"test"}
            src={"/WhoAreWe/feature-fridge.png"}
          />
          <WhoAreWeCard
            alt={"test"}
            src={"/WhoAreWe/feature-plate.png"}
            iSRev={true}
          />
          <WhoAreWeCard
            iSRev={false}
            alt={"test"}
            src={"/WhoAreWe/feature-planner.png"}
          />
        </div>
      </div>
    </div>
  );
}
