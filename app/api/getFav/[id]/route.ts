import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/connect";
export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const { params } = context;

  const favItem = await prisma.recipe.findMany({
    where: {
      AND: {
        userId: params.id,
      },
      isFavorite: {
        equals: true,
      },
    },
  });
  const count = await prisma.recipe.aggregate({
    _count: {
      isFavorite: true,
    },
    where: {
      AND: {
        userId: params.id,
      },
      isFavorite: true,
    },
  });
  return NextResponse.json(
    { fav: favItem, count: count._count.isFavorite },
    { status: 200 }
  );
};
