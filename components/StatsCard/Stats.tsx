"use client";
interface props {
  count: number;
  countFav: number;
}
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";

import Clerk, { useUser } from "@clerk/clerk-react";
import { useState, useEffect, useRef, use } from "react";
export default function Stats({ count, countFav }: props) {
  const data = useSelector((state: RootState) => state.fetchStates.value);

  const { user, isLoaded } = useUser();
  const [userImg, setUserImg] = useState<string | undefined>(undefined);
  const [countState, SetCount] = useState(count);
  const [favState, SetFavCount] = useState(countFav);
  useEffect(() => {
    if (user) setUserImg(user.imageUrl);
  }, [user]);
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (!isFirstRender.current) {
      const getNewCount = async () => {
        try {
          if (user && user.primaryEmailAddressId) {
            const newCount = await axios.get(
              `/api/getCount/${user.primaryEmailAddressId}`
            );

            SetCount(newCount.data.newCount);
          }
        } catch (error) {
          console.error("Error fetching new count:", error);
        }
      };
      const getNewFavCount = async () => {
        try {
          if (user && user.primaryEmailAddressId) {
            const newCount = await axios.get(
              `/api/getFav/${user.primaryEmailAddressId}`
            );

            SetFavCount(newCount.data.count);
          }
        } catch (error) {
          console.error("Error fetching new count:", error);
        }
      };
      getNewFavCount();
      getNewCount();
    } else {
      isFirstRender.current = false;
    }
  }, [data, user]); // Adding 'user' as a dependency for the effect

  useEffect(() => {
    if (user) setUserImg(user.imageUrl);
  }, [user]);

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
          <div className="stat-value">{countState}</div>{" "}
          <div className="stat-desc text-secondary">מתכונים שנוצרו </div>
        </div>
      </div>
      <div className="stat max-lg:hidden flex justify-around items-center">
        <div>
          <div className="stat-value text-primary">{favState}</div>
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

      <div className="stat max-lg:hidden">
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
        <div className="stat-title">Page Views</div>
        <div className="stat-value text-secondary">2.6M</div>
        <div className="stat-desc">21% more than last month</div>
      </div>
    </div>
  );
}
