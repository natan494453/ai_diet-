"use client";
import React, { useState } from "react";
import { useModal } from "@/hooks/useModal";
import { useUser } from "@clerk/clerk-react";
import { useQuery, Authenticated } from "convex/react";
import { api } from "@/convex/_generated/api";
import { editFav } from "@/actions/iditFav";
import { deleteRecipeHandler } from "@/actions/delRecipe";
import { Id } from "@/convex/_generated/dataModel";
import { recipeTypes } from "@/actions/addRecipe";
interface recipeTypeEach extends recipeTypes {
  userId: string;
  _creationTime: number;
  _id: Id<"recipes">;
}
export default function Accordion() {
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
    const filterRecipes = recipes?.filter((item) => {
      return item.title.includes(searchQuery);
    });

    return (
      <div className="flex  relative flex-col  gap-10">
        <h2 className="text-center text-4xl font-bold mt-5">המתכונים שלך</h2>

        <div className="flex gap-6 flex-wrap justify-center max-lg:flex-col  py-10 min-h-screen">
          {filterRecipes?.map((item: recipeTypeEach, index: number) => (
            <div
              key={item._id}
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-2xl lg:w-[30vw] w-full h-max"
            >
              {/* Accordion Header with Recipe Title */}
              <div className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-700 via-pink-600 to-red-600 text-white text-xl font-bold">
                <span>{item.title}</span>
                <span className="text-sm opacity-80">
                  {item.cookTime} • {item.servings} מנות
                </span>
              </div>

              {/* Recipe Content */}
              <div className="p-8 space-y-6">
                {/* Ingredients */}
                <div>
                  <h3 className="text-gray-200 font-semibold text-lg mb-3">
                    מצרכים:
                  </h3>
                  <ul className="space-y-2 text-gray-300 leading-relaxed">
                    {item.ingredients.map((ingredient, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-sm text-gray-400">
                          {ingredient.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-gray-200 font-semibold text-lg mb-3">
                    הוראות הכנה:
                  </h3>
                  <ol className="list-decimal list-inside space-y-3 text-gray-300 pl-4 leading-relaxed">
                    {item.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-base">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between p-6 border-t border-gray-700 bg-gray-800">
                <button
                  onClick={() => openModal(item.title, item._id)}
                  className="bg-red-600 text-white py-3 px-6 rounded-md shadow-md hover:bg-red-700 transition font-semibold"
                >
                  מחק
                </button>

                <button
                  disabled={isFavLoading}
                  onClick={() => addToFavHanlder(item._id)}
                  className={`py-3 px-6 rounded-md shadow-md font-semibold transition ${
                    item.isFavorite
                      ? "bg-yellow-500 text-gray-900 hover:bg-yellow-600"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {item.isFavorite ? "הסר ממעודפים" : "הוסף למעודפים"}
                </button>
              </div>
            </div>
          ))}
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
    <>
      {modal}
      <div className="flex justify-center mt-12 mb-8">
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
      </div>{" "}
      <Authenticated>
        <AuthCotant />
      </Authenticated>
    </>
  );
}
