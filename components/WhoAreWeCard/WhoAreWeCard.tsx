import React from "react";
import Image from "next/image";
interface props {
  src: string;
  alt: string;
  iSRev: boolean;
  title: string;
  description: string;
}
export default function WhoAreWeCard({
  src,
  alt,
  iSRev,
  title,
  description,
}: props) {
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
          className=" w-[60%]   "
        />
      </figure>
      <div className={`card-body  lg:h-[200px] max-lg:text-center `}>
        <h2 className="lg:card-title text-center max-lg:font-bold text-xl mb-2">
          {title}
        </h2>
        <p className="lg:w-[70%]">{description}</p>
      </div>
    </div>
  );
}
