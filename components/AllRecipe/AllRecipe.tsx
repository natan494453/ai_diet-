"use client";
import React from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";
export default function AllRecipe() {
  const AllRecipe = useQuery(api.tasks.getAllRecipe);

  return (
    <div className="flex justify-center gap-10 max-lg:flex-wrap">
      {AllRecipe?.map((item) => {
        const date = new Date(item._creationTime);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        return (
          <Link href={`recipes/${item._id}`}>
            <div className=" w-80  bg-base-200 shadow-xl mt-10 cursor-pointer ">
              <div className="flex flex-col items-center gap-2 ">
                <div className="avatar">
                  <div className="w-40 rounded-full">
                    <img src={item.userImg} />
                  </div>
                </div>
                <div className=" w-full bg-base-100">
                  <h2 className="card-title font-bold">{item.title}</h2>
                  <h3>
                    {month}.{day}.{year}
                  </h3>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
