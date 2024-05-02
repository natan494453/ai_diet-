"use server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db/connect";
import { revalidatePath } from "next/cache";
export const editFav = async (id: number) => {
  try {
    const currentRecipe = await prisma.recipe.findFirst({
      where: {
        id: id,
      },
    });
    if (!currentRecipe) {
      return NextResponse.error();
    }
    const updatedIsFavorite = !currentRecipe.isFavorite;
    await prisma.recipe.update({
      where: {
        id: id,
      },
      data: {
        isFavorite: updatedIsFavorite,
      },
    });

    revalidatePath("/favorite");
  } catch (error) {
    return NextResponse.error();
  }
};
