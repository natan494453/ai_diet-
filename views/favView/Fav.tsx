"use client";

import DOMPurify from "isomorphic-dompurify";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
interface Props {
  user?: string;
}

export default function Fav({ user }: Props) {
  const recipes = useQuery(api.tasks.getFavRecipe, {
    userId: user,
  });

  return (
    <div className="flex flex-col gap-10 items-center mt-10 ">
      {recipes?.length < 1 ? (
        <div>אין מועדפים</div>
      ) : (
        recipes?.map((item) => {
          return (
            <div className="chat-bubble w-[80vw]" key={item._id}>
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
        })
      )}
    </div>
  );
}
