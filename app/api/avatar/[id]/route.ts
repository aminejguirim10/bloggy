import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const avatar = await prisma.user.findUnique({
      where: { id },
    });
    return NextResponse.json(avatar);
  } catch (error) {
    console.log(error);
  }
}
