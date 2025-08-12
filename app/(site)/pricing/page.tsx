export const metadata = {
  title: "Pricing | Seven Acres Estate",
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Pricing & Packages</h1>
      <p className="mb-6 max-w-3xl">
        Our venue packages include access to the estate, essential amenities, and a
        professional photo package. Weekend and weekday rates available.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-medium mb-2">Weekday</h2>
          <p>Monday–Thursday</p>
          <p className="text-2xl font-semibold mt-2">$5,000</p>
        </div>
        <div className="rounded-lg border p-6">
          <h2 className="text-xl font-medium mb-2">Weekend</h2>
          <p>Friday–Sunday</p>
          <p className="text-2xl font-semibold mt-2">$8,500</p>
        </div>
      </div>
      <div className="mt-8">
        <a href="/book" className="inline-block rounded bg-black text-white px-4 py-2">
          Check Availability
        </a>
      </div>
    </main>
  );
}


