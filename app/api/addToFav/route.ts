import { NextResponse, NextRequest } from "next/server";
import prisma from "@/db/connect";
export const dynamic = "force-dynamic";

export const PATCH = async (req: NextRequest, res: NextResponse) => {
  const { id } = await req.json();
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
    const updated = await prisma.recipe.findFirst({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ ok: true, updated: updated }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.error();
  }
};
