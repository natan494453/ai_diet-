import React from "react";
import Card from "@/components/Card/Card";
import { useTranslations } from "next-intl";
export default function Explain() {
  const t = useTranslations("howToStart");
  return (
    <div className=" mt-[5%] ">
      <div>
        <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text font-bold mt-20 max-lg:text-2xl text-9xl text-center">
          {t("title")}
        </h2>
      </div>
      <div className="flex justify-around max-lg:flex-col items-center flex-wrap">
        <Card
          title={t("cardOne.title")}
          explain={t("cardOne.explain")}
          img="/steps/register.png"
        />
        <Card
          title={t("cardTwo.title")}
          explain={t("cardTwo.explain")}
          img="/steps/ask.png"
        />{" "}
        <Card
          title={t("cardThree.title")}
          explain={t("cardThree.explain")}
          img="/steps/thing.png"
          index={2}
        />{" "}
        <Card
          title={t("cardFour.title")}
          explain={t("cardFour.explain")}
          img="/steps/food.png"
        />
      </div>
    </div>
  );
}
