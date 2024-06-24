import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
      },
    });
    return NextResponse.json({ message: "User created", user });
  } catch (error) {
    console.log(error);
  }
}
