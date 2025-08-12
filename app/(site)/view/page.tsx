"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(7),
  date: z.string().min(1),
  time: z.enum(["10:00 AM", "2:00 PM", "4:00 PM"]),
  source: z.string().optional(),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function ViewPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/viewings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setMessage("Thanks! We'll text you a confirmation shortly.");
    } catch (e) {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-2">Schedule Your Venue Viewing</h1>
      <p className="mb-6 text-zinc-600">
        Choose a date and a time slot. We offer 10 AM, 2 PM, and 4 PM viewings.
      </p>

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
            <label className="block text-sm">Preferred Date</label>
            <input className="mt-1 w-full rounded border px-3 py-2" type="date" {...register("date")} />
            {errors.date && <p className="text-sm text-red-600">Required</p>}
          </div>
          <div>
            <label className="block text-sm">Time</label>
            <select className="mt-1 w-full rounded border px-3 py-2" {...register("time")}>
              <option>10:00 AM</option>
              <option>2:00 PM</option>
              <option>4:00 PM</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm">How did you hear about us?</label>
          <input className="mt-1 w-full rounded border px-3 py-2" {...register("source")} />
        </div>
        <div>
          <label className="block text-sm">Special requests</label>
          <textarea className="mt-1 w-full rounded border px-3 py-2" rows={4} {...register("notes")} />
        </div>
        <button disabled={submitting} className="rounded bg-black text-white px-4 py-2">
          {submitting ? "Submitting..." : "Schedule Viewing"}
        </button>
        {message && <p className="text-sm text-zinc-700">{message}</p>}
      </form>
    </main>
  );
}


