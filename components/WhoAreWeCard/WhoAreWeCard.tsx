import React from "react";
import Image from "next/image";
interface props {
  src: string;
  alt: string;
  iSRev: boolean;
}
export default function WhoAreWeCard({ src, alt, iSRev }: props) {
  return (
    <div
      className={`card card-side bg-base-100 shadow-xl hover:bg-base-200 ${iSRev && "flex-row-reverse"} px-10 max-lg:flex-col   `}
    >
      <figure className="  flex justify-center max-lg:items-center max-lg:pt-4">
        <Image
          src={src}
          width={500}
          height={500}
          alt={alt}
          className=" max-lg:w-[60%]  "
        />
      </figure>
      <div className={`card-body ${iSRev && "items-end"}   `}>
        <h2 className="card-title ">New movie is released!</h2>
        <p>Click the button to watch on Jetflix app.</p>
      </div>
    </div>
  );
}
