import React from "react";
import Card from "@/components/Card/Card";
export default function Explain() {
  return (
    <div className=" mt-[5%] ">
      <div>
        <h2 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text font-bold mt-20 max-lg:text-2xl text-9xl text-center">
          איך מתחילים
        </h2>
      </div>
      <div className="flex justify-around max-lg:flex-col items-center flex-wrap">
        <Card
          title={"הרשמה"}
          explain={"ניתן להירשם בקלות עיל ידי לחיצה על התחבר או נסה עכשיו"}
          img="/steps/register.png"
        />
        <Card
          title={"יצירת מתכון"}
          explain={"יש לירשום שם של מאכל או מצרכים שיש  יש לכם בבית"}
          img="/steps/ask.png"
        />{" "}
        <Card
          title={"חישוב המתכון"}
          explain={
            "תוך כמה שניות אחריי לחיצת ה שלח AI יחשב את המכון המושלם בישבליכם"
          }
          img="/steps/thing.png"
        />{" "}
        <Card
          title={"הכנה"}
          explain={"כאת מה שנישאר לעשות זה רק להכין את המתכון!"}
          img="/steps/food.png"
        />
      </div>
    </div>
  );
}
