"use client";
import axios from "axios";
import DOMPurify from "isomorphic-dompurify";
import React, { useEffect, useState } from "react";
interface Props {
  favRecapis: {
    id: number;
    title: string;
    createdAt: Date;
    userId: string;
    recipe: string;
    isFavorite: boolean;
  }[];
}

export default function Fav({ favRecapis }: Props) {
  // const sentizedTitle = favRecapis.map((item) => {
  //   return DOMPurify?.sanitize(item.);
  // });
  return (
    <div className="flex flex-col gap-10 items-center mt-10 ">
      {favRecapis.map((item) => {
        return (
          <div className="chat-bubble w-[80vw]" key={item.id}>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.title),
              }}
            ></div>{" "}
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.recipe),
              }}
            ></div>
          </div>
        );
      })}
    </div>
  );
}
