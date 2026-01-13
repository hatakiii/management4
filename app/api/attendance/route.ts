// app/api/attendance/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const attendance = await prisma.attendance.findMany();
    return NextResponse.json(attendance);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch attendance" },
      { status: 500 }
    );
  }
}
