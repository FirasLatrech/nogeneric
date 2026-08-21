import type { Metadata } from "next";
import { JetBrains_Mono, Geist } from "next/font/google";
import { RiSearchLine, RiAddLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-jetbrains",
});
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
});

export const metadata: Metadata = { title: "pingdeck — status" };

const monitors = [
  { name: "api.pingdeck.io", region: "eu-west", ms: "92ms", checked: "12s ago", up: true },
  { name: "app.pingdeck.io", region: "us-east", ms: "141ms", checked: "18s ago", up: true },
  { name: "webhooks.pingdeck.io", region: "ap-south", ms: "—", checked: "7s ago", up: false },
  { name: "cdn.pingdeck.io", region: "global", ms: "38ms", checked: "25s ago", up: true },
];

export default function Terminal() {
  return (
    <div
      className={`${jetbrains.variable} ${geist.variable} theme-terminal min-h-screen bg-bg font-body text-base text-fg`}
    >
      <main className="mx-auto max-w-4xl px-4 py-10">
        <p className="rise font-display text-xs uppercase tracking-widest text-accent">
          pingdeck / status
        </p>
        <h1 className="rise rise-2 mt-2 mb-3 font-display text-3xl font-bold">
          All systems
          <br />
          answering.
        </h1>
        <p className="rise rise-3 mb-10 max-w-xl text-muted">
          Live checks from 14 regions, every 30 seconds. Last incident: 41 days
          ago, resolved in 6 minutes.
        </p>

        <div className="rise rise-4 mb-10 grid grid-cols-3 gap-3">
          {[
            { label: "Uptime, 90d", value: "99.98%", ok: true },
            { label: "Avg response", value: "184ms", ok: false },
            { label: "Monitors down", value: "1", ok: false },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-md border border-line bg-surface p-4"
            >
              <div className="text-xs uppercase tracking-wider text-muted">
                {s.label}
              </div>
              <div
                className={`mt-1 font-display text-2xl ${s.ok ? "text-accent" : ""}`}
              >
                <CountUp value={s.value} />
              </div>
            </div>
          ))}
        </div>

        <div className="rise rise-5 mb-4 flex gap-2">
          <label className="relative min-w-0 flex-1">
            <RiSearchLine
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
            />
            <input
              type="search"
              placeholder="Filter monitors…"
              className="h-(--control-h) w-full cursor-text rounded-md border border-line bg-surface pr-3 pl-10 text-sm text-fg placeholder:text-muted focus:border-ring focus:ring-2 focus:ring-ring/25 focus:outline-none"
            />
          </label>
          <select
            defaultValue="all"
            className="h-(--control-h) shrink-0 cursor-pointer rounded-md border border-line bg-surface px-3 text-sm text-fg focus:border-ring focus:ring-2 focus:ring-ring/25 focus:outline-none"
          >
            <option value="all">All regions</option>
            <option value="eu">eu-west</option>
            <option value="us">us-east</option>
            <option value="ap">ap-south</option>
          </select>
          <Button type="button" className="font-display font-bold">
            <RiAddLine size={16} />
            Add monitor
          </Button>
        </div>

        <table className="w-full border-collapse text-sm">
          <caption className="pb-2 text-left font-display text-xs uppercase tracking-widest text-muted">
            Monitors
          </caption>
          <thead>
            <tr>
              {["Service", "Region", "Response", "Checked"].map((h, i) => (
                <th
                  key={h}
                  className={`border-b border-line px-3 py-2 text-xs font-medium uppercase tracking-wider text-muted ${i >= 2 ? "text-right" : "text-left"}`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {monitors.map((m) => (
              <tr
                key={m.name}
                className="transition-colors duration-150 hover:bg-surface-hover"
              >
                <td className="border-b border-line px-3 py-2">
                  <span
                    className={`mr-2 inline-block size-2 rounded-lg ${m.up ? "bg-accent pulse" : "bg-danger pulse"}`}
                  />
                  <span className={m.up ? "" : "text-danger"}>{m.name}</span>
                </td>
                <td className="border-b border-line px-3 py-2">{m.region}</td>
                <td className="border-b border-line px-3 py-2 text-right font-display tabular-nums">
                  {m.ms}
                </td>
                <td className="border-b border-line px-3 py-2 text-right font-display tabular-nums">
                  {m.checked}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
