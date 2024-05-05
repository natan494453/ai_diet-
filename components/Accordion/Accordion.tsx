"use client";
import React, { useEffect, useState } from "react";
import { useModal } from "@/hooks/useModal";
import Clerk, { useUser } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

import { useQuery, useMutation, Authenticated } from "convex/react";
import { api } from "@/convex/_generated/api";
import { editFav } from "@/actions/iditFav";
import { deleteRecipeHandler } from "@/actions/delRecipe";
import { Id } from "@/convex/_generated/dataModel";
import { useStoreUserEffect } from "@/hooks/useStoreUserEffect";
export default function Accordion({ token }) {
  const { isLoading, isAuthenticated } = useStoreUserEffect();

  const deleteItem = async (id: Id<"recipes">) => {
    try {
      if (user && user.primaryEmailAddressId && data) {
        await deleteRecipeHandler(id);
        closeModal();
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };
  const { modal, openModal, closeModal, data, id } = useModal({
    children: (
      <>
        <h1 className="text-2xl font-bold py-6">אתה בטוח שאתה רוצה לימחוק?</h1>

        <div className="flex items-center w-full gap-10">
          <button className="btn btn-error" onClick={() => deleteItem(id)}>
            מחק
          </button>
          <button className="btn " onClick={() => closeModal()}>
            בטל
          </button>
        </div>
      </>
    ),
  });
  const { user, isLoaded } = useUser();

  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isFavLoading, setIsFavLoaing] = useState(false);

  const AuthCotant = () => {
    const recipes = useQuery(api.tasks.getRecipe);
    return (
      <div className="flex justify-center relative flex-col items-center gap-10">
        {modal}

        <h2 className="text-center text-4xl font-bold mt-5">המתכונים שלך</h2>
        <div className="flex items-center gap-3">
          <input
            type="text"
            placeholder="חפש מתכון"
            className="input input-bordered w-full max-w-xs"
            id="search"
            name="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-10 w-[80vw] ">
          {recipes?.map((item: any, index: number) => {
            return (
              <div
                key={item.id}
                className="collapse bg-base-200 mb-10 max-lg:pb-14"
              >
                <input
                  type="radio"
                  name="my-accordion-1"
                  defaultChecked={index === 0}
                />
                <div className="collapse-title text-xl font-medium ">
                  {item.title}
                </div>
                <div
                  className="collapse-content "
                  dangerouslySetInnerHTML={{ __html: item.recipe }}
                ></div>{" "}
                <button
                  onClick={() => openModal(item.title, item._id)}
                  className="collapse-content btn cursor-pointer btn-error absolute lg:top-0  bottom-0 lg:left-[0%] max-lg:left-0   flex items-center justify-center z-50 pt-3 w-[40%] lg:w-[123px]"
                >
                  מחק
                </button>
                <button
                  disabled={isFavLoading}
                  onClick={() => {
                    addToFavHanlder(item._id);
                  }}
                  className="collapse-content btn btn-success lg:top-0 absolute bottom-0 left-[10%]  items-center z-50 pt-3 max-lg:right-0 lg:w-[123px] w-[40%] cursor-pointer"
                >
                  {item.isFavorite ? "    הסר ממעודפים" : "    הוסף למעודפים"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  const addToFavHanlder = async (id: string) => {
    setIsFavLoaing(true);
    editFav(id);
    setIsFavLoaing(false);
  };

  return (
    <Authenticated>
      <AuthCotant />
    </Authenticated>
  );
}
