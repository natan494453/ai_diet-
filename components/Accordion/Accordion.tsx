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

        <div className="flex gap-6  flex-wrap justify-center max-lg:flex-col">
          {filterRecipes?.map((item: recipeTypeEach, index: number) => (
            <div
              key={item._id}
              className=" bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:scale-105 hover:shadow-xl lg:w-[30vw] "
            >
              {/* Accordion Header with Recipe Title */}

              <div className=" flex justify-between items-center p-5 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white text-lg font-semibold">
                <span>{item.title}</span>
                <span className="text-sm">
                  {item.cookTime} • {item.servings} מנות
                </span>
              </div>

              {/* Recipe Content */}
              <div className="p-6 space-y-4">
                {/* Ingredients */}
                <div>
                  <h3 className="text-gray-700 font-medium text-lg mb-2">
                    מצרכים:
                  </h3>
                  <ul className="space-y-1 text-gray-600">
                    {item.ingredients.map((ingredient, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium">{ingredient.name}</span>
                        <span className="text-sm text-gray-500">
                          {ingredient.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-gray-700 font-medium text-lg mb-2">
                    הוראות הכנה:
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 pl-4">
                    {item.instructions.map((instruction, idx) => (
                      <li key={idx} className="text-sm">
                        {instruction}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between p-5 border-t bg-gray-50">
                <button
                  onClick={() => openModal(item.title, item._id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-red-600 transition"
                >
                  מחק
                </button>

                <button
                  disabled={isFavLoading}
                  onClick={() => addToFavHanlder(item._id)}
                  className={`py-2 px-4 rounded-md shadow-md transition ${
                    item.isFavorite
                      ? "bg-yellow-400 text-yellow-900 hover:bg-yellow-500"
                      : "bg-green-500 text-white hover:bg-green-600"
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
