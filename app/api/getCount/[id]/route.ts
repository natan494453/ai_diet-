import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/connect";
export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const { params } = context;
  console.log(params.id);
  const count = await prisma.recipe.aggregate({
    _count: {
      userId: true,
    },
    where: {
      userId: params.id,
    },
  });
  console.log(count._count.userId);
  return NextResponse.json({ newCount: count._count.userId }, { status: 200 });
};
