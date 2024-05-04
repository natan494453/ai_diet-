import React from "react";
import { FacebookShare } from "react-share-kit";
interface props {
  title: string;
  recipe: string;
}
export default function FaceBookShareBtn({ title, recipe }: props) {
  return (
    <>
      <FacebookShare title={title} url={recipe} quote={recipe} />
    </>
  );
}

//dishgen.com/recipes/bursting-bbq-chicken-pizza-lvs5bsml
