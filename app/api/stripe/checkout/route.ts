import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2024-11-20.acacia" as any });

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
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_PUBLISHABLE_KEY) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }
  try {
    const json = await request.json();
    const data = schema.parse(json);

    // Create a draft booking to link to payment intent
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

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: data.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: data.depositAmount,
            product_data: {
              name: `Seven Acres Estate Deposit (${new Date(data.startDate).toDateString()} - ${new Date(
                data.endDate
              ).toDateString()})`,
              description: `${data.eventType} — ${data.firstName} ${data.lastName}`,
            },
          },
        },
      ],
      success_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/thank-you` ,
      cancel_url: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/book` ,
      metadata: { bookingId: booking.id },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}


