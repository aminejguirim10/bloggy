import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const comments = await prisma.comment.findMany({
      where: { blogId: id },
      orderBy: { createdAt: "desc" },
      include: {
        author: true,
      },
    });
    return NextResponse.json(comments);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
