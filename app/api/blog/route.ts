import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import { cookies } from "next/headers"
export async function GET(req: Request) {
  const cookieStore = cookies() // adding this line to make this file dynamic rendering in production
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json(blogs)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}
