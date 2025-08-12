import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({ date: z.string().min(1), reason: z.string().min(1) });

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);
    const blocked = await prisma.blockedDate.create({
      data: { date: new Date(data.date), reason: data.reason },
    });
    return NextResponse.json({ id: blocked.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


