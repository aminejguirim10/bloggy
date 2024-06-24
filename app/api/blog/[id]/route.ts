import { NextResponse } from "next/server";
import prisma from "@/lib/db";
export async function POST(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { title, content, image } = await req.json();
    const user = await prisma?.user.findUnique({
      where: { email: id },
    });
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }
    const blog = await prisma.blog.create({
      data: {
        title,
        content,
        image,
        author: {
          connect: {
            email: id,
          },
        },
      },
    });
    return NextResponse.json({ message: "Blog created", blog });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const Blog = await prisma.blog.delete({
      where: {
        id: id,
      },
    });
    return NextResponse.json({ message: "Blog deleted", Blog });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const blog = await prisma.blog.findUnique({
      where: {
        id: id,
      },
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { title, content, image } = await req.json();
    const blog = await prisma.blog.update({
      where: {
        id: id,
      },
      data: {
        title,
        content,
        image,
      },
    });
    return NextResponse.json(blog);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
