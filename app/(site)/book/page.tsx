"use client";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  eventType: z.string().min(1),
  guestCount: z.coerce.number().min(1),
  startDate: z.string().min(1),
  endDate: z.string().min(1),
  specialRequests: z.string().optional(),
  agree: z.literal(true, {
    errorMap: () => ({ message: "You must agree to the terms" }),
  }),
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
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const startDate = watch("startDate");
  const endDate = watch("endDate");
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
    } catch (e) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-2">Book Your Event at Seven Acres Estate</h1>
      <p className="mb-6 text-zinc-600">A 40% deposit is required to reserve your date.</p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Start Date</label>
            <input className="mt-1 w-full rounded border px-3 py-2" type="date" {...register("startDate")} />
            {errors.startDate && <p className="text-sm text-red-600">Required</p>}
          </div>
          <div>
            <label className="block text-sm">End Date</label>
            <input className="mt-1 w-full rounded border px-3 py-2" type="date" {...register("endDate")} />
            {errors.endDate && <p className="text-sm text-red-600">Required</p>}
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
        <div className="rounded border p-4 bg-zinc-50">
          <p>Total: <strong>${(totalCents / 100).toLocaleString()}</strong></p>
          <p>Deposit (40%): <strong>${(depositCents / 100).toLocaleString()}</strong></p>
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" {...register("agree")} /> I agree to the terms
        </label>
        {errors.agree && <p className="text-sm text-red-600">{errors.agree.message?.toString()}</p>}
        <button disabled={submitting} className="rounded bg-black text-white px-4 py-2">
          {submitting ? "Redirecting..." : "Pay Deposit"}
        </button>
        {message && <p className="text-sm text-zinc-700">{message}</p>}
      </form>
    </main>
  );
}


