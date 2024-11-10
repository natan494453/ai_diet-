"use client";

import { useQuery, Authenticated } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
export default function Stats() {
  const t = useTranslations("stats");
  const { user, isLoaded } = useUser();
  const [userImg, setUserImg] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (user) setUserImg(user.imageUrl);
  }, [user]);

  const RecipeCount = () => {
    const recipes = useQuery(api.tasks.getRecipe);
    return <div className="stat-value">{recipes?.length}</div>;
  };
  const FavCount = () => {
    const favCount = useQuery(api.tasks.getFavRecipe);
    return <div className="stat-value">{favCount?.length}</div>;
  };
  const GetUser = () => {
    const user = useQuery(api.tasks.user);
    return <img src={user?.img} alt="" />;
  };
  const GetCount = () => {
    const user = useQuery(api.tasks.user);
    return <div className="stat-value">{user?.count}</div>;
  };
  return (
    <div className="stats shadow  w-[99vw] max-lg:mt-2 relative z-0">
      <div className="flex items-center justify-around">
        <div className="text-secondary">
          <div className="avatar online">
            <div className="w-16 rounded-full">
              <Authenticated>
                <GetUser />
              </Authenticated>
            </div>
          </div>
        </div>{" "}
        <div>
          <Authenticated>
            <RecipeCount />
          </Authenticated>
          <div className="stat-title text-secondary"> {t("created")} </div>
        </div>
      </div>
      <div className="stat max-lg:hidden flex justify-around items-center">
        <div>
          <div className="stat-value text-primary">
            {" "}
            <Authenticated>
              <FavCount />
            </Authenticated>
          </div>
          <div className="stat-title">{t("favorites")}</div>
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
          <Authenticated>
            <GetCount />
          </Authenticated>

          <div className="stat-title text-secondary"> {t("questionAsked")}</div>
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
