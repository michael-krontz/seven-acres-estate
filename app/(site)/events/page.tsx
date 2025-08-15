import { StockImage } from "@/components/StockImage";
import { media } from "@/lib/media";

export const metadata = { title: "Events | Seven Acres Estate" };

export default function EventsPage() {
  return (
    <div>
      <section className="hero relative">
  <StockImage src={media.events.hero} alt="Corporate reception space" fill priority className="object-cover" />
        <div className="hero-inner mx-auto max-w-4xl px-6 text-center text-white relative">
          <span className="eyebrow tracking-[0.3em] text-[11px]">Private & Corporate Retreats</span>
          <h1 className="mb-6">Versatile Spaces. Elevated Atmosphere.</h1>
          <p className="lead mx-auto max-w-2xl font-light text-white/90">An adaptive estate for leadership offsites, milestone celebrations & refined private gatherings.</p>
        </div>
      </section>
      <section className="section">
        <div className="section-narrow space-y-20">
          <div className="reveal grid-basic md:grid-cols-12 gap-12">
            <div className="md:col-span-5">
              <span className="eyebrow">Flexibility</span>
              <h2>Spaces That Transition Seamlessly</h2>
            </div>
            <div className="md:col-span-7 space-y-6 text-[15px] leading-relaxed">
              <p>From strategy sessions to elevated dinners & networking environments, spatial flow adapts throughout the day. Outdoor lawn and interior hall combine to support breakout groups, team building, or formal presentation moments.</p>
              <p className="muted">Our refined neutral palette supports brand integration without visual conflict.</p>
            </div>
          </div>

          <div className="reveal">
            <span className="eyebrow">Business & Private Features</span>
            <div className="grid-basic md:grid-cols-3 gap-8 mt-4">
              {[
                { t: 'AV Ready', d: 'Support for presentation displays & discreet audio.' },
                { t: 'Breakout Zones', d: 'Indoor / outdoor clusters for team ideation.' },
                { t: 'Catering Friendly', d: 'Flexible vendor support & staging areas.' },
                { t: 'Executive Retreats', d: 'Calm setting for leadership immersion.' },
                { t: 'Outdoor Activation', d: 'Lawn suitable for brand experiences & activities.' },
                { t: 'Photography Included', d: 'Document sessions or milestone moments.' },
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
              <span className="eyebrow">Event Types</span>
              <h2 className="mb-6">Designed For Versatility</h2>
              <ul className="space-y-4 text-[14.5px]">
                {[
                  'Leadership Retreats',
                  'Strategy Offsites',
                  'Milestone Dinners',
                  'Brand Launches',
                  'Award Ceremonies',
                  'Private Celebrations',
                  'Client Appreciation Events'
                ].map(step => (
                  <li key={step} className="flex gap-3"><span className="mt-1 h-2 w-2 rounded-full bg-[var(--sage)]" /> {step}</li>
                ))}
              </ul>
            </div>
            <div className="space-y-6 self-center">
              <p>We partner with planners and internal teams to shape an experience that balances productivity, hospitality, and brand alignment. The estate offers both serenity and infrastructure.</p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a href="/pricing" className="btn btn-outline">Corporate Investment</a>
                <a href="/view" className="btn btn-primary">Plan A Site Visit</a>
              </div>
            </div>
          </div>

          <div className="reveal text-center">
            <h2 className="mb-6">Plan Your Next Corporate Event</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/view" className="btn btn-primary">Schedule Viewing</a>
              <a href="/book" className="btn btn-outline">Reserve Date</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
