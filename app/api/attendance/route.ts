import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Бүх ирцийн мэдээллийг хэрэглэгчийн мэдээлэлтэй нь хамт авах
    const attendances = await prisma.attendance.findMany({
      include: {
        User: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
      orderBy: {
        date: "desc", // Хамгийн сүүлийн ирцийг дээр нь харуулах
      },
    });

    return NextResponse.json(attendances, { status: 200 });
  } catch (error) {
    console.error("Attendance fetch error:", error);

    return NextResponse.json(
      {
        message: "Ирцийн мэдээллийг авахад алдаа гарлаа",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  } finally {
    // Serverless орчинд prisma холболтыг салгах нь зөв практик байдаг
    await prisma.$disconnect();
  }
}
