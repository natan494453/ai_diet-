import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/connect";
export const dynamic = "force-dynamic";

export const GET = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const { params } = context;

  const data = await prisma.recipe.findMany({
    where: { userId: params.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ newData: data }, { status: 200 });
};
