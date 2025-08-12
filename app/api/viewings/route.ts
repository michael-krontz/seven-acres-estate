import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { isDateAvailable } from "@/lib/availability";
import { sendEmail } from "@/lib/email";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  date: z.string().min(1),
  time: z.string().min(1),
  source: z.string().optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);
    const date = new Date(data.date);
    const available = await isDateAvailable(date);
    if (!available) {
      return NextResponse.json({ error: "Date unavailable" }, { status: 400 });
    }
    const viewing = await prisma.viewing.create({
      data: {
        date,
        time: data.time,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        notes: data.notes,
      },
    });
    await sendEmail({
      to: data.email,
      subject: "Viewing request received",
      html: `<p>Thank you ${data.firstName}, your viewing request is received for ${date.toDateString()} at ${data.time}.</p>`,
    });
    return NextResponse.json({ id: viewing.id });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const viewings = await prisma.viewing.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(viewings);
}


