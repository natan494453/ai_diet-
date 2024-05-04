import React from "react";
import { NextResponse, NextRequest } from "next/server";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;

  const recepit = await fetchQuery(api.tasks.getCurrentRecipe, {
    recipeId: id,
  });

  return (
    <div className="flex justify-center items-center h-[70vh]">
      {recepit.map((item) => {
        return (
          <div className=" bg-base-200 lg:w-[60vw] p-10 rounded-xl shadow-2xl max-lg:mt-[100%]">
            <div className="font-bold text-2xl">{item.title}</div>
            <div dangerouslySetInnerHTML={{ __html: item.recipe }}></div>
          </div>
        );
      })}
    </div>
  );
}
