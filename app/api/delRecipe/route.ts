import { NextRequest, NextResponse } from "next/server";
import prisma from "@/db/connect";

export const dynamic = "force-dynamic";

export const DELETE = async (req: NextRequest, res: NextResponse) => {
  const { data } = await req.json();
  try {
    await prisma.recipe.delete({
      where: {
        id: data, // Corrected the comparison operator from '===' to ':'
      },
    });
    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return NextResponse.error();
  }
};
