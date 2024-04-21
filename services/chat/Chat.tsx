"use client";
import { useCompletion } from "ai/react";
import React from "react";
import DOMPurify from "dompurify";
import Clerk, { useUser } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
//idn_2fPqJPpopuPSXXV6O3i03b5TKam
export default function Chat() {
  const { user, isLoaded } = useUser();
  const [userMail, setUserImg] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (user) setUserImg(user.primaryEmailAddress?.id);
  }, [user]);

  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({ body: { userMail: userMail } });
  const sentaized = DOMPurify?.sanitize(completion);
  return (
    <div className=" border-b-2 border-[#f1f1f15b] flex justify-center pb-4 mt-10 ">
      <div className="    flex flex-col w-[80%]  ">
        <form onSubmit={handleSubmit}>
          <div
            className="chat-bubble"
            dangerouslySetInnerHTML={{ __html: sentaized }}
          ></div>

          <div className=" flex  justify-center gap-7 mt-10 flex-col  w-[80vw]">
            <input
              className="   border border-gray-300 rounded-xl  shadow-xl p-4"
              value={input}
              placeholder=" כתוב שאלה על אוכל או מצרכים"
              onChange={handleInputChange}
            />
            <div className="flex justify-center gap-10  ">
              <div>
                <button
                  className=" btn btn-accent px-16 text-xl "
                  disabled={isLoading}
                  type="submit"
                >
                  שלח
                </button>
              </div>
              <div>
                <button
                  className=" btn btn-warning px-16 text-xl"
                  type="button"
                  onClick={stop}
                >
                  עצור
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
