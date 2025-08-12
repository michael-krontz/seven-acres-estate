export default function Home() {
  return (
    <main className="min-h-[70vh]">
      <section className="relative h-[60vh] grid place-items-center bg-[url('/placeholder/hero-1.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl md:text-6xl font-semibold">Seven Acres Estate</h1>
          <p className="mt-4 text-lg md:text-xl">Timeless countryside weddings and events</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <a href="/view" className="rounded bg-white text-black px-4 py-2">Schedule a Viewing</a>
            <a href="/book" className="rounded border border-white px-4 py-2">Check Availability</a>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-12">
        <h2 className="text-2xl font-semibold mb-4">The Venue</h2>
        <p className="text-zinc-700 max-w-3xl">
          A refined estate on seven acres of rolling hills, with indoor and outdoor
          spaces designed for unforgettable celebrations. Photo package included.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-6 text-zinc-700">
          <li className="rounded border p-4">Indoor reception hall</li>
          <li className="rounded border p-4">Outdoor ceremony lawn</li>
          <li className="rounded border p-4">Dressing suites</li>
          <li className="rounded border p-4">Tables and chairs</li>
          <li className="rounded border p-4">Capacity up to 200 guests</li>
          <li className="rounded border p-4">Professional photo package</li>
        </ul>
      </section>
    </main>
  );
}
