"use server";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db/connect";
import { revalidatePath } from "next/cache";
export const delItem = async (id: number) => {
  try {
    await prisma.recipe.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/dashboard");
  } catch (error) {
    return NextResponse.error();
  }
};
