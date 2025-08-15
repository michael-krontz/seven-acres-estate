"use client";
import { useState, useMemo } from "react";
import { BookingCalendar } from "@/components/Calendar";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  eventType: z.string().min(1),
  guestCount: z.coerce.number().min(1), // ensure numeric
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  specialRequests: z.string().optional(),
  agree: z.literal(true, { message: "You must agree to the terms" }),
});

type FormValues = z.infer<typeof schema>;

export default function BookPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      eventType: "Wedding",
      guestCount: 1,
      startDate: "",
      endDate: "",
      specialRequests: "",
      agree: undefined as unknown as true,
    },
  });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const [selecting, setSelecting] = useState<'start'|'end'>('start');
  const [startSelected, setStartSelected] = useState<Date | null>(null);
  const [endSelected, setEndSelected] = useState<Date | null>(null);
  const totalCents = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const weekendRate = 850000; // $8,500
    const weekdayRate = 500000; // $5,000
    const start = new Date(startDate);
    const end = new Date(endDate);
    const isWeekend = [5, 6, 0].includes(start.getDay()) || [5, 6, 0].includes(end.getDay());
    return isWeekend ? weekendRate : weekdayRate;
  }, [startDate, endDate]);

  const depositCents = Math.round(totalCents * 0.4);

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, totalAmount: totalCents, depositAmount: depositCents }),
      });
      if (!res.ok) throw new Error("Failed to create checkout session");
      const { url } = await res.json();
      window.location.href = url;
  } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="section pt-24 section-narrow max-w-3xl">
      <span className="eyebrow">Secure Your Date</span>
      <h1 className="mb-4">Reserve Your Event at Seven Acres Estate</h1>
      <p className="mb-10 muted max-w-2xl">A 40% deposit reserves exclusive estate access. Deposit applies toward total investment. You’ll receive a confirmation & receipt immediately after payment.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">First Name</label>
            <input className="mt-1 w-full rounded border px-3 py-2" {...register("firstName")} />
            {errors.firstName && <p className="text-sm text-red-600">Required</p>}
          </div>
          <div>
            <label className="block text-sm">Last Name</label>
            <input className="mt-1 w-full rounded border px-3 py-2" {...register("lastName")} />
            {errors.lastName && <p className="text-sm text-red-600">Required</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Email</label>
            <input className="mt-1 w-full rounded border px-3 py-2" type="email" {...register("email")} />
            {errors.email && <p className="text-sm text-red-600">Invalid email</p>}
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input className="mt-1 w-full rounded border px-3 py-2" {...register("phone")} />
            {errors.phone && <p className="text-sm text-red-600">Required</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div>
            <div className="flex items-center gap-4 mb-4 text-sm">
              <button type="button" onClick={() => setSelecting('start')} className={`px-3 py-1 rounded border ${selecting==='start' ? 'bg-[var(--sage)] text-white border-[var(--sage)]' : 'border-[var(--border-soft)]'}`}>Select Start</button>
              <button type="button" onClick={() => setSelecting('end')} disabled={!startSelected} className={`px-3 py-1 rounded border ${selecting==='end' ? 'bg-[var(--sage)] text-white border-[var(--sage)]' : 'border-[var(--border-soft)]'} ${!startSelected ? 'opacity-40 cursor-not-allowed' : ''}`}>Select End</button>
              <div className="ml-auto text-xs tracking-wide text-slate-500 flex gap-3">
                {startSelected && <span>Start: {startSelected.toLocaleDateString()}</span>}
                {endSelected && <span>End: {endSelected.toLocaleDateString()}</span>}
              </div>
            </div>
            <BookingCalendar
              label={selecting==='start' ? 'Select Start Date' : 'Select End Date'}
              value={selecting==='start' ? startSelected : endSelected}
              onChange={(d) => {
                if (selecting==='start') {
                  setStartSelected(d);
                  const iso = d.toISOString().split('T')[0];
                  (document.querySelector('input[name="startDate"]') as HTMLInputElement).value = iso;
                  if (endSelected && d > endSelected) {
                    setEndSelected(null);
                    (document.querySelector('input[name="endDate"]') as HTMLInputElement).value = '';
                  }
                } else {
                  setEndSelected(d);
                  const iso = d.toISOString().split('T')[0];
                  (document.querySelector('input[name="endDate"]') as HTMLInputElement).value = iso;
                }
              }}
            />
            <input type="hidden" {...register("startDate")} />
            <input type="hidden" {...register("endDate")} />
            {(errors.startDate || errors.endDate) && <p className="text-sm text-red-600 mt-2">Both dates required</p>}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Event Type</label>
            <input className="mt-1 w-full rounded border px-3 py-2" {...register("eventType")} />
          </div>
          <div>
            <label className="block text-sm">Guest Count</label>
            <input className="mt-1 w-full rounded border px-3 py-2" type="number" {...register("guestCount", { valueAsNumber: true })} />
          </div>
        </div>
        <div>
          <label className="block text-sm">Special Requests</label>
          <textarea className="mt-1 w-full rounded border px-3 py-2" rows={4} {...register("specialRequests")} />
        </div>
        <div className="rounded border border-[var(--border-soft)] p-5 bg-soft-gray/60 space-y-1 text-sm">
          <p className="m-0">Total <span className="float-right font-medium">${(totalCents / 100).toLocaleString()}</span></p>
          <p className="m-0">Deposit (40%) <span className="float-right font-medium">${(depositCents / 100).toLocaleString()}</span></p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("agree")} /> I agree to the terms
        </label>
        {errors.agree && <p className="text-sm text-red-600">{errors.agree.message?.toString()}</p>}
        <button disabled={submitting} className="btn btn-primary">
          {submitting ? "Redirecting..." : "Pay Deposit"}
        </button>
        {message && <p className="text-sm text-zinc-700">{message}</p>}
      </form>
    </main>
  );
}


