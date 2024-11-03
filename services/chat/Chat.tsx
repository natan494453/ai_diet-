"use client";
import { useCompletion } from "ai/react";
import React, { ChangeEvent } from "react";
import DOMPurify from "isomorphic-dompurify";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { experimental_useObject as useObject } from "ai/react";
import { recipeSchema } from "@/constants/text";

export default function Chat({ token }: { token: string | undefined }) {
  const { user, isLoaded } = useUser();
  const [userMail, setUserImg] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (user) setUserImg(user.id);
  }, [user]);

  const [isOK, setIsok] = useState<boolean | null>(false);
  const [isNotOK, setIsNotOK] = useState<boolean | null>(false);
  const [isCaloriesClicked, setIsCaloriesClicked] = useState<boolean>(false);
  const [calories, setCalories] = useState<number | null>(null);
  const [recipe, setRecipe] = useState<string | null>(null);
  const handleCaloreClick = () => {
    setIsCaloriesClicked((prev) => {
      return !prev;
    });
    if (isCaloriesClicked) setCalories(null);
  };
  const handleCaloreChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCalories(Number(e.target.value));
  };
  const { isLoading, stop, object, submit } = useObject({
    api: "/api/completion",
    schema: recipeSchema,
  });

  console.log(object);
  return (
    <div className=" border-b-2 border-[#f1f1f15b] flex justify-center pb-4 mt-10 ">
      <div
        className={`toast toast-top top-[20%] toast-center z-40 duration-200  ${
          isOK ? " opacity-1" : " opacity-0"
        }`}
      >
        <div className="alert alert-success ">
          <span className="text-2xl ">מתכון נוסף</span>
        </div>
      </div>{" "}
      <div
        className={`toast toast-top top-[20%] toast-center z-40 duration-200 ${
          isNotOK ? " opacity-1" : " opacity-0"
        }`}
      >
        <div className="alert alert-error">
          <span className="text-2xl">מתכון לא נוסף</span>
        </div>
      </div>
      <div className="    flex flex-col w-[80%]  ">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit({
              userMail: userMail,
              img: user?.imageUrl,
              token: token,
              calories,
              recipe,
            });
          }}
        >
          <div className="chat-bubble w-full max-w-3xl mx-auto p-6 md:p-10 bg-gray-900 shadow-2xl rounded-2xl border border-gray-700 transition-all duration-300 ease-in-out">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-around items-center mb-6 md:mb-8 text-purple-400 font-extrabold text-3xl space-y-4 md:space-y-0 md:space-x-4">
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">זמן הכנה</span>
                <span>{object?.cookTime || "N/A"}</span>
              </div>
              <div className="text-center md:flex-1 text-3xl md:text-4xl">
                <span>{object?.title}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-400">מנות</span>
                <span>{object?.servings || "N/A"}</span>
              </div>
            </div>

            {/* Ingredients */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl text-gray-300 font-semibold mb-4">
                מרכיבים
              </h3>
              {object?.ingredients?.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col md:flex-row justify-between items-center text-lg text-gray-100 bg-gray-800 px-4 md:px-5 py-2 md:py-3 rounded-lg shadow-md hover:bg-purple-500 hover:bg-opacity-20 transition-colors duration-200 ease-in-out"
                >
                  <p className="font-medium">{item?.name}</p>
                  <p className="text-gray-400">{item?.quantity}</p>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <div className="mt-8 md:mt-10 space-y-3 md:space-y-4 text-gray-200">
              <h3 className="text-xl md:text-2xl text-gray-300 font-semibold mb-4">
                הוראות הכנה
              </h3>
              {object?.instructions?.map((item, index) => (
                <p
                  key={index}
                  className="bg-gray-800 p-3 md:p-4 rounded-lg shadow-md hover:bg-purple-500 hover:bg-opacity-20 transition-colors duration-200 ease-in-out"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className=" flex  justify-center gap-7 mt-10 flex-col  w-[80vw]">
            <input
              className="   border border-gray-300 rounded-xl  shadow-xl p-4"
              // value={isLoading ? "......." : input}
              placeholder={isLoading ? "..." : " כתוב שאלה על אוכל או מצרכים"}
              onChange={(e) => {
                setRecipe(e.target.value);
              }}
            />
            <div className={`${isCaloriesClicked ? "static" : "hidden"}`}>
              <input
                type="number"
                value={calories as number}
                min={1}
                className="   border border-gray-300 rounded-xl  shadow-xl p-4"
                placeholder={isLoading ? "..." : "  מספר קלוריות רצוי "}
                onChange={handleCaloreChange}
              />
            </div>
            <div className="form-control  lg:w-[20%]">
              <label className="label cursor-pointer">
                <span className="label-text text-xl"> עם מספר קלוריות</span>
                <input
                  onChange={handleCaloreClick}
                  type="checkbox"
                  className="checkbox checkbox-primary"
                />
              </label>
            </div>
            <div className="flex justify-center gap-10  ">
              <div>
                <button
                  className=" btn btn-accent px-16 text-xl "
                  disabled={isLoading}
                  type="submit"
                >
                  שלח
                </button>
              </div>
              <div>
                <button
                  className=" btn btn-warning px-16 text-xl"
                  type="button"
                  onClick={stop}
                >
                  עצור
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
