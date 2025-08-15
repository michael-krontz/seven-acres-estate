import { StockImage } from "@/components/StockImage";
import { media } from "@/lib/media";

export default function Home() {
  return (
    <>
      {/* Hero */}
  <section className="hero full relative bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(0,0,0,0.65))] mt-[-100px]">
        <StockImage src={media.hero.image} candidates={media.hero.candidates} alt={media.hero.alt} fill priority className="object-cover" />
        <div className="hero-bottom text-center text-white">
          <div className="mx-auto max-w-3xl px-4">
            <span className="eyebrow tracking-[0.3em] text-[11px]">Countryside Luxury Venue</span>
            <h1 className="mb-6">Seven Acres Estate</h1>
            <p className="lead mx-auto max-w-2xl font-light text-white">Understated elegance across rolling grounds & light‑filled interiors. A refined setting for elevated weddings & private events – professional photography included.</p>
            <div className="mt-10 flex items-center justify-center">
              <a href="/view" className="btn btn-frost-light px-10 py-4 text-[13px] tracking-wide font-medium rounded-md">Schedule a Private Viewing</a>
            </div>
          </div>
        </div>
      </section>

      {/* Weddings / Events / Corporate Trio */}
      <section className="section-tight bg-soft-gray/40" style={{ paddingBottom: 0 }}>
        <div className="section-wide">
          <div className="heading-line"><span className="eyebrow tracking-[0.25em]">Latest at the Estate</span></div>
          <div className="grid gap-12 md:grid-cols-3 items-start">
            {/* Private Events (now first, image swapped) */}
            <article className="space-y-5 max-w-[36ch]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <StockImage
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&q=80"
                  alt="Guests mingling during a private event in a bright space"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Private Events</h3>
                <p className="text-sm tracking-wide uppercase text-slate-500 mb-3">Social & Milestone</p>
                <p className="text-[14.5px] leading-relaxed m-0">Anniversaries, vow renewals, retreats, and curated social dinners—crafted with intimate scale and indoor / outdoor flow.</p>
                <a href="/events" className="mt-4 inline-block text-[13px] font-medium tracking-wide border-b border-[var(--charcoal)]/30 hover:border-[var(--charcoal)] pb-0.5">Private Events</a>
              </div>
            </article>
            {/* Weddings (now second, video) */}
            <article className="space-y-5 max-w-[36ch]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md group">
                <video className="h-full w-full object-cover group-hover:scale-[1.02] transition duration-[2000ms] ease-out" autoPlay muted loop playsInline preload="auto" poster="https://images.unsplash.com/photo-1530023367847-a683933f4172?auto=format&fit=crop&w=800&q=60" aria-label="Wedding highlight video">
                  <source src="https://cdn.coverr.co/videos/coverr-a-bride-holding-a-bouquet-9715/1080p.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Weddings at the Estate</h3>
                <p className="text-sm tracking-wide uppercase text-slate-500 mb-3">Romantic & Timeless</p>
                <p className="text-[14.5px] leading-relaxed m-0">Light‑filled interiors and sweeping greens create a refined, story‑driven setting for elevated wedding weekends and intentional gatherings.</p>
                <a href="/weddings" className="mt-4 inline-block text-[13px] font-medium tracking-wide border-b border-[var(--charcoal)]/30 hover:border-[var(--charcoal)] pb-0.5">Explore Weddings</a>
              </div>
            </article>
            {/* Corporate (image swapped to outdoor dining) */}
            <article className="space-y-5 max-w-[36ch]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-md">
                <StockImage
                  src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?auto=format&fit=crop&w=900&q=80"
                  candidates={[
                    'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=900&q=80',
                    'https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?auto=format&fit=crop&w=900&q=80'
                  ]}
                  alt="Outdoor dining setup suitable for corporate retreat dinner" 
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl mb-2">Corporate & Retreats</h3>
                <p className="text-sm tracking-wide uppercase text-slate-500 mb-3">Teams & Strategy</p>
                <p className="text-[14.5px] leading-relaxed m-0">Leadership off‑sites and brand sessions benefit from calm surroundings, focused spaces, and seamless vendor freedom.</p>
                <a href="/events" className="mt-4 inline-block text-[13px] font-medium tracking-wide border-b border-[var(--charcoal)]/30 hover:border-[var(--charcoal)] pb-0.5">Corporate Retreats</a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Two Column Features (Spa & Dining) */}
      <section className="section-tight bg-soft-gray">
        <div className="section-wide">
          <div className="grid md:grid-cols-2 gap-28">
      <article className="space-y-8">
              <div className="relative aspect-[5/3] md:aspect-[16/9] overflow-hidden rounded-lg">
                <StockImage
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80"
                  alt="Sunlit tree‑lined pathway across the estate grounds"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-5">
        <h3 className="font-serif text-3xl md:text-[2.15rem]">The Estate</h3>
                <p className="text-[15px] leading-relaxed m-0">Seven acres of curated landscape frame ceremony greens, garden paths and quiet reflective corners—creating organic movement and layered portrait opportunities throughout the day.</p>
                <a href="/about" className="inline-block text-[13px] font-medium tracking-wide border-b border-[var(--charcoal)]/30 hover:border-[var(--charcoal)] pb-0.5">Discover More</a>
              </div>
            </article>
      <article className="space-y-8">
              <div className="relative aspect-[5/3] md:aspect-[16/9] overflow-hidden rounded-lg">
                <StockImage
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80"
                  alt="Modern rustic event barn interior with exposed timber beams and large windows"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-5">
        <h3 className="font-serif text-3xl md:text-[2.15rem]">The Venue</h3>
                <p className="text-[15px] leading-relaxed m-0">Neutral, light‑rich interiors provide a timeless backdrop—flexible for understated gatherings or fully produced celebrations while maintaining calm spatial flow.</p>
                <a href="/view" className="inline-block text-[13px] font-medium tracking-wide border-b border-[var(--charcoal)]/30 hover:border-[var(--charcoal)] pb-0.5">Schedule a Viewing</a>
              </div>
            </article>
          </div>
        </div>
      </section>
      {/* Removed: Intro, Features, and Included sections per request */}
    </>
  );
}
