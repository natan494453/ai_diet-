import React from "react";
import Image from "next/image";
interface cardProps {
  title: string;
  explain: string;
  img: string;
}

export default function Card({ title, explain, img }: cardProps) {
  return (
    <div className="flex flex-col shadow-2xl items-center rounded-2xl lg:w-96 w-[94vw] bg-base-300 h-[550px] mt-10 ">
      <div className="card-body items-start justify-start">
        <h2 className="card-title">{title}</h2>
        <p>{explain}</p>
      </div>
      <figure className=" ">
        <Image
          className=" h-[365px] rounded-2xl  "
          src={img}
          alt={title}
          width={370}
          height={370}
        />
      </figure>
    </div>
  );
}
