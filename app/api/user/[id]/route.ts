import { NextResponse } from "next/server"
import prisma from "@/lib/db"
export async function GET(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: id,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params: { id } }: { params: { id: string } }
) {
  try {
    const { description, name, image } = await req.json()

    const user = await prisma.user.update({
      where: { id },
      data: {
        name,
        description,
        image,
      },
    })
    return NextResponse.json({ message: "User Updated", user })
  } catch (error) {
    console.log(error)
  }
}
