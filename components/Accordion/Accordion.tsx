"use client";
import React, { useState, useRef, useEffect } from "react";
import { useModal } from "@/hooks/useModal";
import axios from "axios";
import Clerk, { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { addRecipe, addFav } from "@/lib/features/fetchStates";
interface dataProps {
  dataa: any;
}

export default function Accordion({ dataa }: dataProps) {
  const deleteItem = async (id: number) => {
    try {
      if (user && user.primaryEmailAddressId && data) {
        await axios.delete(`/api/delRecipe/`, {
          data: {
            data: id,
          },
        });
        closeModal();
        dispatch(addRecipe(null));
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
  const dataGlobal = useSelector((state: RootState) => state.fetchStates.value);
  const dispatch: AppDispatch = useDispatch();
  const [fullData, setFullData] = useState(dataa);
  const isFirstRender = useRef(true);
  const { user, isLoaded } = useUser();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const filteredData = fullData.filter((item: any) =>
    item.title.includes(searchQuery)
  );
  const [isFavLoading, setIsFavLoaing] = useState(false);

  useEffect(() => {
    if (!isFirstRender.current) {
      const getNewCount = async () => {
        try {
          if (user && user.primaryEmailAddressId) {
            const newCount = await axios.get(
              `/api/getRecipe/${user?.primaryEmailAddressId}`
            );
            setFullData(newCount.data.newData);
            setIsFavLoaing(false);
          }
        } catch (error) {
          console.error("Error fetching new count:", error);
        }
      };

      getNewCount();
    } else {
      isFirstRender.current = false;
    }
  }, [dataGlobal, user]); // Adding 'user' as a dependency for the effect
  const addToFavHanlder = async (id: number) => {
    setIsFavLoaing(true);
    setFullData((prevData: any) => {
      return prevData.map((item: any) => {
        if (item.id === id) {
          // Toggle isFavorite value
          return { ...item, isFavorite: !item.isFavorite };
        }
        return item;
      });
    });
    const send = await axios.patch("/api/addToFav", {
      id: id,
    });

    setIsFavLoaing(false);
    dispatch(addFav(null));
  };
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
        {filteredData.map((item: any, index: number) => {
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
                onClick={() => openModal(item.title, item.id)}
                className="collapse-content btn btn-error absolute lg:top-0  bottom-0 lg:left-[0%] max-lg:left-0   flex items-center justify-center z-50 pt-3 w-[40%] lg:w-[123px]"
              >
                מחק
              </button>
              <button
                disabled={isFavLoading}
                onClick={() => {
                  addToFavHanlder(item.id);
                }}
                className="collapse-content btn btn-success lg:top-0 absolute bottom-0 left-[10%]  items-center z-50 pt-3 max-lg:right-0 lg:w-[123px] w-[40%]"
              >
                {item.isFavorite ? "    הסר למעודפים" : "    הוסף למעודפים"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
