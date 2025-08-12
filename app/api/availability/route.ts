import { NextResponse } from "next/server";
import { isDateAvailable } from "@/lib/availability";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const dateParam = searchParams.get("date");
  if (!dateParam) return NextResponse.json({ error: "Missing date" }, { status: 400 });
  const date = new Date(dateParam);
  const available = await isDateAvailable(date);
  return NextResponse.json({ available });
}


