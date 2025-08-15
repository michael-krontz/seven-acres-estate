import { StockImage } from "@/components/StockImage";
import { media } from "@/lib/media";

export const metadata = { title: "Weddings | Seven Acres Estate" };

export default function WeddingsPage() {
  return (
    <div>
      <section className="hero relative">
  <StockImage src={media.weddings.hero} alt="Elegant wedding ceremony setup" fill priority className="object-cover" />
        <div className="hero-inner mx-auto max-w-4xl px-6 text-center text-white relative">
          <span className="eyebrow tracking-[0.3em] text-[11px]">Refined Countryside Weddings</span>
          <h1 className="mb-6">Your Perfect Day, Beautifully Unhurried</h1>
          <p className="lead mx-auto max-w-2xl font-light text-white/90">A romantic, light‑filled estate setting where every detail is intentionally calm, elegant, and deeply personal.</p>
        </div>
      </section>
      <section className="section">
        <div className="section-narrow space-y-20">
          <div className="reveal grid-basic md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <span className="eyebrow">The Experience</span>
              <h2>Thoughtful Flow From First Look To Last Toast</h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-[15px] leading-relaxed">
              <p>Our weddings are intentionally designed around space, timing, and atmosphere. Natural light and neutral textures create a graceful canvas for floral design, personal styling, and documentary‑style photography.</p>
              <p className="muted">You’re never rushed—we preserve generous transitions so the day feels immersive rather than scheduled.</p>
            </div>
          </div>

          <div className="reveal">
            <span className="eyebrow">Included Essentials</span>
            <div className="grid-basic md:grid-cols-3 gap-8 mt-4">
              {[
                { t: 'Professional Photography', d: 'Included full‑day coverage with refined storytelling & portrait direction.' },
                { t: 'Indoor / Outdoor Flexibility', d: 'Seamless backup ceremony flow with transitional lighting consistency.' },
                { t: 'Elegant Suites', d: 'Private preparation spaces designed for calm, natural light & comfort.' },
                { t: 'Curated Furnishings', d: 'Reception tables, chairs & layout advisory for foundational design.' },
                { t: 'Portrait Locations', d: 'Sunset fields, garden pathways & architectural framing for editorial imagery.' },
                { t: 'Vendor Freedom', d: 'Bring your selected creative partners—no restrictive lists.' }
              ].map(f => (
                <div key={f.t} className="card">
                  <h3 className="card-title text-[1.1rem] mb-2">{f.t}</h3>
                  <p className="text-[14px] leading-relaxed muted m-0">{f.d}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal grid-basic md:grid-cols-2 gap-16">
            <div>
              <span className="eyebrow">A Wedding Day Flow</span>
              <h2 className="mb-6">A Calm, Intentional Progression</h2>
              <ul className="space-y-4 text-[14.5px]">
                {[
                  'Late Morning Arrival & Suite Prep',
                  'First Look & Private Vows',
                  'Editorial Portraits Across the Estate',
                  'Guest Arrival & Soft Seating',
                  'Outdoor Ceremony on the Lawn',
                  'Cocktail Hour & Golden Hour Portraits',
                  'Reception & Toasts in the Hall',
                  'Evening Dancing & Sunset Exit'
                ].map(step => (
                  <li key={step} className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[var(--sage)]" /> {step}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 self-center">
              <p>Every celebration is stewarded by a thoughtful on‑site team focused on guest comfort, spatial pacing & a seamless vendor experience. The estate remains exclusively yours from arrival to departure.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="/pricing" className="btn btn-outline">Wedding Investment</a>
                <a href="/view" className="btn btn-primary">Schedule Viewing</a>
              </div>
            </div>
          </div>

          <div className="reveal text-center">
            <h2 className="mb-6">Begin Planning Your Dream Wedding</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/view" className="btn btn-primary">Private Viewing</a>
              <a href="/book" className="btn btn-outline">Reserve Date</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
