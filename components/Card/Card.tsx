import React from "react";
import Image from "next/image";
interface cardProps {
  title: string;
  explain: string;
  img: string;
  index?:number
}

export default function Card({ title, explain, img,index }: cardProps) {
  console.log(index)
  return (
    <div className="flex flex-col shadow-2xl items-center rounded-2xl lg:w-96 w-[94vw] bg-base-300 lg:h-[550px] mt-10  max-lg:pb-5">
      <div className="card-body lg:items-start lg:justify-start text-center">
        <h2 className="lg:card-title font-bold text-2xl">{title}</h2>
        <p>{explain}</p>
      </div>
      <figure className="h-max flex justify-center">
        <Image
          className={` lg:h-[365px] rounded-2xl   ${index === 2 ? "max-lg:w-[200px]":"max-lg:w-[60%]"}`}
          src={img}
          alt={title}
          width={370}
          height={370}
        />
      </figure>
    </div>
  );
}
