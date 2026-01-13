// app/api/attendance/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany();
    return NextResponse.json(attendance);
  } catch (error) {
    console.error("api/attendance/route.ts error:", error);
    return NextResponse.json(
      { message: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const attendance = await prisma.attendance.create({
      data: {
        userId: Number(body.userId),

        date: new Date(body.date),
        clockIn: new Date(body.clockIn),
        clockOut: body.clockOut ? new Date(body.clockOut) : null,

        updatedAt: new Date(),
      },
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    console.error("api/attendance/route.ts error:", error);
    return NextResponse.json(
      { message: "Failed to post attendance" },
      { status: 500 }
    );
  }
}
