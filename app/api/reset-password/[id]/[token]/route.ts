import jwt from "jsonwebtoken"
import { NextResponse } from "next/server"
import prisma from "@/lib/db"
import bcryptjs from "bcryptjs"
export async function PUT(
  req: Request,
  { params: { id, token } }: { params: { id: string; token: string } }
) {
  const oldUser = await prisma.user.findUnique({ where: { id } })
  if (!oldUser) {
    return NextResponse.json({ message: "User not found" }, { status: 404 })
  }
  const { password } = await req.json()
  if (!password) {
    return NextResponse.json(
      { message: "Password is required" },
      { status: 400 }
    )
  }
  const secret = process.env.JWT_SECRET! + oldUser.password
  try {
    const verify = jwt.verify(token, secret)
    if (!verify) {
      return NextResponse.json({ message: "Invalid token" }, { status: 400 })
    }
    const hashedPassword = await bcryptjs.hash(password, 10)
    const user = await prisma.user.update({
      where: { id },
      data: { password: hashedPassword },
    })
    return NextResponse.json({ message: "Password updated" }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    )
  }
}
