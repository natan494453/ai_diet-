import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { [key: string]: string } }
) => {
  const { params } = context;
  console.log(params.id);
  return NextResponse.json({ msg: "hello" }, { status: 200 });
};
