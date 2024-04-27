import React from "react";
import Fav from "@/views/favView/Fav";
import prisma from "@/db/connect";
import { auth, currentUser } from "@clerk/nextjs/server";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { revalidateTag } from "next/cache";
export const metadata: Metadata = {
  title: "מועדפים",
  description: "מתכונים",
};
export default async function page() {
  const user = await currentUser();
  //user?.emailAddresses[0].id
  const favRecapis = await prisma.recipe.findMany({
    where: {
      AND: {
        userId: user?.emailAddresses[0].id,
      },
      isFavorite: {
        equals: true,
      },
    },
  });

  return (
    <div>
      <h2 className="text-8xl  text-center">מועדפים</h2>
      {favRecapis.length === 0 ? (
        <h3 className="text-8xl  text-center mt-10">אין מתכונים במועדפים</h3>
      ) : (
        <Fav />
      )}
    </div>
  );
}
