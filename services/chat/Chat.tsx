"use client";
import { useCompletion } from "ai/react";
import React from "react";
import DOMPurify from "dompurify";
export default function Chat() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion();

  const sentaized = DOMPurify?.sanitize(completion);
  return (
    <div className=" border-b-2 border-[#f1f1f15b] ">
      <div className="mx-auto  max-w-md py-16 flex flex-col stretch  ">
        <form onSubmit={handleSubmit}>
          <div
            className="chat-bubble"
            dangerouslySetInnerHTML={{ __html: sentaized }}
          ></div>

          <div className=" flex items-center justify-center gap-10 mt-10 ">
            <input
              className=" w-full max-w-md   border border-gray-300 rounded-xl  shadow-xl p-2"
              value={input}
              onChange={handleInputChange}
            />
            <div className="flex gap-6">
              <button
                className="btn btn-accent"
                disabled={isLoading}
                type="submit"
              >
                שלח
              </button>
              <button className=" btn btn-warning" type="button" onClick={stop}>
                עצור
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
