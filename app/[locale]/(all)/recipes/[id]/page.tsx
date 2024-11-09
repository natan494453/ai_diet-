import React from "react";
import { fetchMutation, fetchQuery } from "convex/nextjs";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
export default async function page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const { id } = params;

  const recepit = await fetchQuery(api.tasks.getCurrentRecipe, {
    recipeId: id,
  });

  return (
    <div className="flex justify-center items-center  ">
      {recepit.map((item) => {
        return (
          <div
            key={item._id}
            className=" bg-base-200 lg:w-[60vw] p-10 rounded-xl shadow-2xl "
          >
            <div className="font-bold text-2xl">{item.title}</div>
            <div dangerouslySetInnerHTML={{ __html: item.recipe }}></div>
          </div>
        );
      })}
    </div>
  );
}
