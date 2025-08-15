"use client";
import { useEffect, useState, useMemo } from "react";
import { addMonths, format, startOfMonth, subMonths, parseISO, isSameDay } from "date-fns";

interface CalendarDay { date: string; available: boolean; }
interface CalendarAPI { month: string; days: CalendarDay[]; }

export interface BookingCalendarProps {
  value: Date | null;
  onChange: (date: Date) => void;
  disabled?: boolean;
  className?: string;
  minDate?: Date;
  label?: string;
}

export function BookingCalendar({ value, onChange, disabled, className, label }: BookingCalendarProps) {
  const [cursor, setCursor] = useState<Date>(startOfMonth(value ?? new Date()));
  const [data, setData] = useState<CalendarAPI | null>(null);
  const [loading, setLoading] = useState(false);

  const monthParam = format(cursor, "yyyy-MM");

  useEffect(() => {
    let ignore = false;
    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/calendar?month=${monthParam}`);
        const json: CalendarAPI = await res.json();
        if (!ignore) setData(json);
      } finally { setLoading(false); }
    }
    load();
    return () => { ignore = true; };
  }, [monthParam]);

  const weeks = useMemo(() => {
    if (!data) return [] as CalendarDay[][];
    const firstDay = startOfMonth(parseISO(data.days[0].date));
    const startWeekday = firstDay.getDay();
    const padded: (CalendarDay | null)[] = Array(startWeekday).fill(null).concat(data.days);
    while (padded.length % 7 !== 0) padded.push(null);
    const out: CalendarDay[][] = [];
    for (let i=0;i<padded.length;i+=7) out.push(padded.slice(i,i+7) as CalendarDay[]);
    return out;
  }, [data]);

  return (
    <div className={className}>
      {label && <p className="mb-2 text-xs tracking-widest uppercase text-[var(--sage)] font-semibold">{label}</p>}
      <div className="flex items-center justify-between mb-4">
        <button type="button" className="btn btn-ghost px-2 py-1 text-sm" onClick={() => setCursor(c => subMonths(c,1))} disabled={loading}>←</button>
        <h3 className="font-serif text-lg">{format(cursor, "MMMM yyyy")}</h3>
        <button type="button" className="btn btn-ghost px-2 py-1 text-sm" onClick={() => setCursor(c => addMonths(c,1))} disabled={loading}>→</button>
      </div>
      <div className="grid grid-cols-7 text-center text-[11px] uppercase tracking-wider text-slate-500 mb-2">
        {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(d => <div key={d}>{d}</div>)}
      </div>
      <div className="space-y-1">
        {loading && <div className="h-40 animate-pulse rounded bg-soft-gray" />}
        {!loading && weeks.map((week,i) => (
          <div key={i} className="grid grid-cols-7 gap-1">
            {week.map((day, idx) => {
              if (!day) return <div key={idx} />;
              const d = parseISO(day.date);
              const selected = value && isSameDay(value, d);
              const base = day.available ? 'cursor-pointer hover:border-[var(--sage)] hover:bg-[var(--sage)]/5' : 'opacity-30 cursor-not-allowed';
              return (
                <button
                  type="button"
                  key={day.date}
                  disabled={!day.available || disabled}
                  onClick={() => onChange(d)}
                  className={`aspect-square text-[12px] rounded border border-[var(--border-soft)] font-medium flex items-center justify-center transition ${base} ${selected ? 'bg-[var(--sage)] text-white border-[var(--sage)]' : ''}`}
                  aria-label={format(d,'PPP') + (day.available ? ' available' : ' unavailable')}
                >{d.getDate()}</button>
              );
            })}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded border border-[var(--border-soft)]"/> Available</span>
        <span className="flex items-center gap-1 opacity-40"><span className="h-3 w-3 rounded border border-[var(--border-soft)] bg-slate-300/40"/> Unavailable</span>
        <span className="flex items-center gap-1"><span className="h-3 w-3 rounded bg-[var(--sage)]"/> Selected</span>
      </div>
    </div>
  );
}
