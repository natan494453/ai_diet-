"use client";

import { useQuery, Authenticated } from "convex/react";
import { api } from "@/convex/_generated/api";
import { editFav } from "@/actions/iditFav";
import { useState, useRef, useEffect } from "react";
import { recipeTypes } from "@/actions/addRecipe";

interface Props {
  user?: string;
}

export default function Fav({ user }: Props) {
  const [serachQ, setserachQ] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const [mTrack, setMtrack] = useState(false);
  const [x, setX] = useState<number>();

  const addToFavHanlder = async (id: string) => {
    editFav(id);
  };

  const FavRecipeElement = () => {
    const favRecipe = useQuery(api.tasks.getFavRecipe);
    const filteredFav = favRecipe?.filter((item) =>
      item.title.includes(serachQ)
    );

    const handleMouseMove = (e: MouseEvent) => {
      if (mTrack && ref.current) {
        const movementX = e.movementX;
        ref.current.scrollLeft -= movementX;
      }
    };

    useEffect(() => {
      const handleMouseUp = () => setMtrack(false);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("mousemove", handleMouseMove);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp);
        document.removeEventListener("mousemove", handleMouseMove);
      };
    }, [mTrack]);

    return !favRecipe ? (
      <div>אין מועדפים</div>
    ) : (
      <>
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="חפש מתכון"
            className="input input-bordered w-full max-w-xs text-lg text-gray-800 placeholder-gray-500 bg-gray-100 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
            value={serachQ}
            onChange={(e) => setserachQ(e.target.value)}
          />
        </div>

        <div
          ref={ref}
          className="flex justify-around mb-10 gap-10 translate-x-[20%]"
          onMouseDown={(e) => {
            setX(e.clientX);
            setMtrack(true);
          }}
        >
          {filteredFav?.map((item: recipeTypes) => (
            <div
              key={item.id || item.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg transition-transform w-[50vw]"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                  {item.title}
                </h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  <span>{item.cookTime} • </span>
                  <span>{item.prepTime} הכנה • </span>
                  <span>{item.servings} מנות</span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  מצרכים:
                </h3>
                <ul className="space-y-1 text-gray-600 dark:text-gray-400">
                  {item.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span>{ingredient.name}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {ingredient.quantity}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                  הוראות הכנה:
                </h3>
                <ol className="list-decimal list-inside space-y-1 text-gray-600 dark:text-gray-400 pl-4">
                  {item.instructions.map((instruction, idx) => (
                    <li key={idx} className="text-base">
                      {instruction}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="flex flex-col gap-10 items-center mt-10 overflow-x-hidden">
      <Authenticated>
        <FavRecipeElement />
      </Authenticated>
    </div>
  );
}
