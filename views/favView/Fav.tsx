"use client";

import DOMPurify from "isomorphic-dompurify";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { editFav } from "@/actions/iditFav";
import { useState } from "react";
interface Props {
  user?: string;
}

export default function Fav({ user }: Props) {
  const [serachQ, setserachQ] = useState<string>("");

  const addToFavHanlder = async (id: string) => {
    editFav(id);
  };
  // const filteredFav = recipes?.filter((item) => {
  //   return item.title.includes(serachQ);
  // });

  return (
    <div className="flex flex-col gap-10 items-center mt-10 ">
      {/* {recipes?.length < 1 ? (
        <div>אין מועדפים</div>
      ) : (
        <>
          <input
            type="text"
            placeholder="חפש "
            className="input input-bordered w-full max-w-xs"
            value={serachQ}
            onChange={(e) => setserachQ(e.target.value)}
          />

          {filteredFav?.map((item) => {
            return (
              <div className="chat-bubble w-[80vw] relative" key={item._id}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.title),
                  }}
                ></div>{" "}
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(item.recipe),
                  }}
                ></div>{" "}
                <div className="flex justify-center mt-2">
                  <button
                    onClick={() => {
                      addToFavHanlder(item._id);
                    }}
                    className=" btn btn-error lg:top-0  bottom-0 left-[10%]  items-center z-50 mb-2 mt-2  m-auto  max-lg:right-0 lg:w-[123px] w-[40%] cursor-pointer"
                  >
                    הסר ממעודפים
                  </button>
                </div>
              </div>
            );
          })}
        </>
      )} */}
    </div>
  );
}
