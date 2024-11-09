import React from "react";
import AllRecipe from "@/components/AllRecipe/AllRecipe";
export default function page() {
  return (
    <div>
      <div className=" h-[100px] flex items-center justify-center mt-10 bg-[url('https://www.dishgen.com/images/food-tile.jpg')]  bg-repeat ">
        <h2 className=" text-center text-4xl font-bold text-white">
          כל המתכונים
        </h2>
      </div>
      <AllRecipe />
    </div>
  );
}
