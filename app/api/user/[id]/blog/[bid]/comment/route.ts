import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(
  req: Request,
  { params: { id, bid } }: { params: { id: string; bid: string } }
) {
  const { content } = await req.json();
  if (!content)
    return NextResponse.json({ error: "content is required" }, { status: 400 });
  try {
    const user = await prisma?.user.findUnique({
      where: { id },
    });
    if (!user)
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    const comment = await prisma.comment.create({
      data: {
        content,
        blogId: bid,
        authorId: id,
      },
    });
    if (comment) {
      return NextResponse.json({ message: "Comment created", comment });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
