"use client";
import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../delRecipe/Modal";
import { useModal } from "@/hooks/useModal";
interface dataProps {
  dataa: any;
}
export default function Accordion({ dataa }: dataProps) {
  const { modal, openModal, closeModal, data } = useModal({
    children: (
      <>
        <h1 className="text-2xl font-bold py-6">אתה בטוח שאתה רוצה לימחוק?</h1>

        <div className="flex items-center w-full gap-10">
          <button className="btn btn-error">מחק</button>
          <button className="btn " onClick={() => closeModal()}>
            בטל
          </button>
        </div>
      </>
    ),
  });

  return (
    <div className="flex justify-center relative flex-col items-center gap-10">
      {modal}

      <h2 className="text-center text-4xl font-bold mt-5">המתכונים שלך</h2>
      <div className="flex flex-col gap-10 w-[80vw]">
        {dataa.map((item: any, index: number) => {
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
              <button
                onClick={() => openModal(item.title)}
                className="collapse-content btn btn-error absolute pt-2 left-0 flex items-center justify-center"
              >
                מחק
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
