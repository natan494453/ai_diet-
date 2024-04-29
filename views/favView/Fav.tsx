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
  user?: string;
}

export default function Fav({ favRecapis, user }: Props) {
  const [favData, setFaveData] = useState(favRecapis);
  useEffect(() => {
    const getFav = async () => {
      const data = await axios.get(`api/getFav/${user}`);
      setFaveData(data.data.fav);
    };
    getFav();
  }, []);
  return (
    <div className="flex flex-col gap-10 items-center mt-10 ">
      {favData.map((item) => {
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
