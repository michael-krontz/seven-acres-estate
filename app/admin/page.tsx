"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main className="p-6">Loading...</main>;
  }

  if (!session) {
    return (
      <main className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Admin Login</h1>
        <button className="rounded bg-black text-white px-4 py-2" onClick={() => signIn()}>
          Sign in
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <button className="rounded border px-3 py-1" onClick={() => signOut()}>
          Sign out
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <a href="/api/viewings" className="rounded border p-4">Viewings (API)</a>
        <a href="/api/bookings" className="rounded border p-4">Bookings (API)</a>
        <a href="/api/blocked-dates" className="rounded border p-4">Block Dates (POST)</a>
      </div>
      <p className="text-zinc-600 mt-6">This is a minimal MVP admin. We can expand with tables and actions.</p>
    </main>
  );
}


