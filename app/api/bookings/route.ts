import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  eventType: z.string().min(1),
  guestCount: z.number().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  totalAmount: z.number().int().min(0),
  depositAmount: z.number().int().min(0),
  specialRequests: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const json = await request.json();
    const data = schema.parse(json);
    const booking = await prisma.booking.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        eventType: data.eventType,
        guestCount: data.guestCount,
        startDate: new Date(data.startDate),
        endDate: new Date(data.endDate),
        totalAmount: data.totalAmount,
        depositAmount: data.depositAmount,
        finalPaymentDue: new Date(new Date(data.endDate).getTime() + 1000 * 60 * 60 * 24 * 60),
        specialRequests: data.specialRequests,
      },
    });
    return NextResponse.json({ id: booking.id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export async function GET() {
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(bookings);
}


