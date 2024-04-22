"use client";
import React from "react";

interface dataProps {
  data: any;
}
export default function Accordion({ data }: dataProps) {
  return (
    <div className="flex justify-center relative flex-col items-center gap-10">
      <h2 className="text-center text-4xl font-bold mt-5">המתכונים שלך</h2>
      <div className="flex flex-col gap-10 w-[80vw]">
        {data.map((item: any, index: number) => {
          return (
            <div key={item.id} className="collapse bg-base-200">
              <input
                type="radio"
                name="my-accordion-1"
                defaultChecked={index === 0}
              />
              <div className="collapse-title text-xl font-medium">
                {item.title}
              </div>
              <div
                className="collapse-content"
                dangerouslySetInnerHTML={{ __html: item.recipe }}
              ></div>{" "}
              <button className="collapse-content btn btn-error absolute pt-2 left-0 flex items-center justify-center">
                מחק
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
