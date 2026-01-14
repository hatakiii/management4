import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;

    const birthday = new Date(formData.get("birthday") as string);
    const experience = Number(formData.get("experience"));
    const salary = Number(formData.get("salary"));

    const departmentIdRaw = formData.get("departmentId");
    const departmentId = departmentIdRaw ? Number(departmentIdRaw) : null;

    if (!username || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }
    const exists = await prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    if (exists) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: 409 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        firstName,
        lastName,
        password: hashedPassword,
        birthday,
        experience,
        salary,
        departmentId,
        updatedAt: new Date(),
      },
    });
    return NextResponse.json({ id: user.id, userName: user.username });
  } catch (error) {
    console.error("Failed to sign up", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
