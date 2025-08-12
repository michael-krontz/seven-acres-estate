import { startOfDay, isBefore } from "date-fns";
import { prisma } from "./prisma";

export async function isDateAvailable(date: Date): Promise<boolean> {
  const dayStart = startOfDay(date);
  if (isBefore(dayStart, startOfDay(new Date()))) {
    return false;
  }
  const [bookingExists, blockedExists] = await Promise.all([
    prisma.booking.findFirst({
      where: {
        startDate: { lte: dayStart },
        endDate: { gte: dayStart },
        status: { not: "CANCELLED" },
      },
    }),
    prisma.blockedDate.findFirst({ where: { date: dayStart } }),
  ]);
  return !bookingExists && !blockedExists;
}


