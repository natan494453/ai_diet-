"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Clerk, { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef, use } from "react";

export default function Stats() {
  const { user, isLoaded } = useUser();
  const [userImg, setUserImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user) setUserImg(user.imageUrl);
  }, [user]);

  const recipes = useQuery(api.tasks.getRecipe, {
    userId: user?.primaryEmailAddressId as any,
  });
  const userCurrent = useQuery(api.tasks.getuser, {
    userId: user?.primaryEmailAddressId as any,
  });
  const [favCount, setFavCount] = useState(0);
  useEffect(() => {
    if (recipes) {
      const favoriteCount = recipes.reduce((count, recipe) => {
        if (recipe.isFavorite) {
          return count + 1;
        } else {
          return count;
        }
      }, 0);
      setFavCount(favoriteCount);
    }
  }, [recipes]);

  return (
    <div className="stats shadow  w-[99vw] max-lg:mt-2">
      <div className="flex items-center justify-around">
        <div className="text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <img src={userImg} />
            </div>
          </div>
        </div>{" "}
        <div>
          <div className="stat-value">{recipes?.length}</div>{" "}
          <div className="stat-title text-secondary">מתכונים שנוצרו </div>
        </div>
      </div>
      <div className="stat max-lg:hidden flex justify-around items-center">
        <div>
          <div className="stat-value text-primary">{favCount}</div>
          <div className="stat-title">מתכונים מעודפים</div>
        </div>
        <div className="stat-figure text-primary ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
      </div>

      <div className="stat max-lg:hidden flex justify-around items-center">
        <div>
          {userCurrent && (
            <div className="stat-value  mt-1">{userCurrent[0]?.count}</div>
          )}

          <div className="stat-title text-secondary">שאלות שנישאלו</div>
        </div>
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-8 h-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
