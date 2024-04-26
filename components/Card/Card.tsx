import React from "react";
import Image from "next/image";
interface cardProps {
  title: string;
  explain: string;
  img: string;
}
export default function Card({ title, explain, img }: cardProps) {
  return (
    <div className="card w-96 bg-base-300 shadow-xl h-[550px] mt-10">
      <div className="card-body items-start justify-start">
        <h2 className="card-title">{title}</h2>
        <p>{explain}</p>
      </div>
      <figure className=" ">
        <Image
          className=" h-[365px] rounded-lg  "
          src={img}
          alt={title}
          width={370}
          height={370}
        />
      </figure>
    </div>
  );
}
