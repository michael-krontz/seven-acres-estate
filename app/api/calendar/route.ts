import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { startOfMonth, endOfMonth, eachDayOfInterval, isBefore, startOfDay } from "date-fns";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const monthParam = searchParams.get("month"); // format YYYY-MM
  if (!monthParam) return NextResponse.json({ error: "Missing month" }, { status: 400 });
  const [yearStr, monthStr] = monthParam.split("-");
  const year = Number(yearStr);
  const monthIndex = Number(monthStr) - 1;
  if (isNaN(year) || isNaN(monthIndex)) return NextResponse.json({ error: "Invalid month" }, { status: 400 });
  const monthStart = startOfMonth(new Date(year, monthIndex, 1));
  const monthEnd = endOfMonth(monthStart);

  const [bookings, blocked] = await Promise.all([
    prisma.booking.findMany({
      where: {
        OR: [
          { startDate: { lte: monthEnd }, endDate: { gte: monthStart } },
        ],
        status: { not: "CANCELLED" },
      },
      select: { startDate: true, endDate: true },
    }),
    prisma.blockedDate.findMany({
      where: { date: { gte: monthStart, lte: monthEnd } },
      select: { date: true },
    }),
  ]);

  const blockedSet = new Set(blocked.map(b => startOfDay(b.date).toISOString()));

  const days = eachDayOfInterval({ start: monthStart, end: monthEnd }).map(d => {
    const dayStart = startOfDay(d);
    const iso = dayStart.toISOString();
    const past = isBefore(dayStart, startOfDay(new Date()));
    const overlapsBooking = bookings.some(b => dayStart >= startOfDay(b.startDate) && dayStart <= startOfDay(b.endDate));
    const unavailable = past || blockedSet.has(iso) || overlapsBooking;
    return {
      date: iso,
      available: !unavailable,
    };
  });

  return NextResponse.json({ month: monthParam, days });
}
