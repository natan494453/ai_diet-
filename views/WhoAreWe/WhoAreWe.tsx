import React, { useTransition } from "react";
import Image from "next/image";
import WhoAreWeCard from "@/components/WhoAreWeCard/WhoAreWeCard";
import { aboutUsText } from "@/constants/text";
import { useTranslations } from "next-intl";
export default function WhoAreWe() {
  const t = useTranslations("WhoAreWe");
  const s = useTranslations("aboutUsText");

  return (
    <div className=" bg-base-300 mt-10 relative pb-10">
      <div className=" relative">
        <h2 className=" text-center font-bold text-xl lg:text-2xl pt-10 text-warning">
          {t("title")}
        </h2>
        <h1 className=" text-center text-2xl lg:text-4xl font-bold mt-4">
          {t("subTitle")}
        </h1>
        <div className="flex justify-center max-lg:px-4">
          <h3 className="text-center mt-4 w-[600px]">{t("description")}</h3>
        </div>

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
          {aboutUsText.map((item, index) => {
            return (
              <WhoAreWeCard
                key={item.title}
                iSRev={index % 2 === 0 ? true : false}
                src={item.img}
                alt={item.alt}
                title={s(`card${index}.title`)}
                description={s(`card${index}.description`)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
