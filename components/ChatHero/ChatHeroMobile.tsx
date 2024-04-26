"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
export default function ChatHeroMobile() {
  const { width, height } = useSelector(
    (state: RootState) => state.WindowSizeStates
  );
  const [typedTextUser, setTypedTextUser] = useState("");
  const [typedTextAI, setTypedTextAI] = useState("");
  const userText = "בבצל,פסטה,רוטב עבגניות,גבינה";
  const lastText = `הנה מתכון פשוט לפסטה עם רוטב עגבניות, בצל וגבינה:
    מרכיבים:<br />
    250 גרם פסטה<br />
    1 בצל גדול , קצוץ<br />
    2-3 כפות רוטב עגבניות<br />
    100 גרם גבינת פרמזן או רומנו מגוררת<br />
    מלח ופלפל לפי הטעם<br />
    כוס מים<br />
    כוס שמן זית<br />
    הוראות הכנה:<br />
    1. בסיר עם מים ומלח, הביאו לרתיחה והוסיפו את.... הפסטה. בשלב זה, עשו זאת על פי ההוראות באריזה.<br />
    2. בסיר אחר, שטפו וקצצו את הבצל לקוביות קטנות.<br />
    3. בסיר אחר, שימו את השמן הזית והקפיצו את הבצל עד שיהפוך לשקוף ורך.<br />
    4. הוסיפו את רוטב העגבניות וערבבו היטב. אם הרוטב נראה יבש, הוסיפו מים קצת.<br />
    5. כאשר הפסטה מוכנה, סננו אותה מהמים והוסיפו לסיר עם הרוטב. ערבבו היטב כך שהפסטה תתקפל ברוטב.<br />
    6. גרמו לפסטה לספוג את הטעמים על אש נמוכה לכ-5 דקות, ערבבו מדי פעם.<br />
    7. חתכו את הגבינה לקרקע קטנים והוסיפו אותם לסיר.<br />
    8. הוסיפו מלח ופלפל לפי הטעם.<br />
    9. גישה חמה וציפו בפרמזן מגורר.<br />
    בתיאבון!`;

  useEffect(() => {
    let i = 0;
    console.log(width);
    const typingIntervalUser = setInterval(() => {
      if (i < userText.length - 1) {
        setTypedTextUser((prevTypedText) => prevTypedText + userText[i]);
        i++;
      } else {
        clearInterval(typingIntervalUser);
        let j = 0;
        const typingIntervalAI = setInterval(() => {
          if (j < lastText.length / 2.8) {
            setTypedTextAI((prevTypedText) => prevTypedText + lastText[j]);
            j++;
          } else {
            clearInterval(typingIntervalAI);
          }
        }, 40);
      }
    }, 50);

    return () => {
      clearInterval(typingIntervalUser);
    };
  }, []);

  return (
    <div className="flex justify-center mt-20 lg:hidden ">
      <div className="lg:w-[50vw] bg-base-300 rounded-xl p-6 ">
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            נתן
            <time className="text-xs opacity-50"> 12:45</time>
          </div>
          <div className="chat-bubble">{typedTextUser}</div>
        </div>
        <div className="chat chat-end">
          <div className="chat-image avatar">
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <div className="chat-header">
            שפי
            <time className="text-xs opacity-50"> 12:46</time>
          </div>
          <div
            className="chat-bubble"
            dangerouslySetInnerHTML={{ __html: typedTextAI }}
          ></div>
        </div>
      </div>
    </div>
  );
}
