import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  RiGithubLine,
  RiArrowRightLine,
  RiArrowRightUpLine,
  RiCloseLine,
} from "@remixicon/react";
import {
  Instrument_Serif,
  Geist,
  JetBrains_Mono,
  Fraunces,
  Space_Grotesk,
} from "next/font/google";

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
});
const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-geist",
});
// Loaded only to render each showcase card in its own display face.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-jetbrains",
});
const fraunces = Fraunces({
  subsets: ["latin"],
  weight: "600",
  variable: "--font-fraunces",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "nogeneric",
  description:
    "An open-source Claude Code skill that stops AI from shipping generic-looking UI.",
};

const phases = [
  ["One question", "It infers everything it can, then asks only the highest-value unknown: the vibe."],
  ["Three directions", "Genuinely different systems — not three variations of the same idea."],
  ["Lock tokens", "A full :root block. Colors, two fonts, type scale, spacing, radii. Nothing else exists."],
  ["Build", "Real copy, token-only values, banned-patterns list, and a mechanical self-check."],
  ["Iterate", "“Make it pop” becomes a concrete token change — never a random patch."],
];

const showcases = [
  {
    href: "/terminal",
    theme: "theme-terminal",
    name: "Terminal",
    desc: "Dark, dense, monospace. An uptime status page with a filter bar, live status dots, and tabular data.",
    featured: true,
  },
  {
    href: "/editorial",
    theme: "theme-editorial",
    name: "Editorial",
    desc: "Warm paper, serif headlines. A reading-journal landing page.",
    featured: false,
  },
  {
    href: "/brutalist",
    theme: "theme-brutalist",
    name: "Brutalist",
    desc: "Thick borders, loud type. A design-studio portfolio.",
    featured: false,
  },
  {
    href: "/clinic",
    theme: "theme-clinic",
    name: "Clinical",
    desc: "Cool, calm, trustworthy. A clinic dashboard — sidebar, header, data table, and a designed empty state.",
    featured: true,
  },
];

const banned = [
  "Purple/blue gradients",
  "Glassmorphism cards",
  "rounded-2xl on everything",
  "Emoji as icons",
  "Three identical feature cards",
  "Lorem ipsum",
  "Inter as the only font",
  "Shadows on every element",
  "lucide-react icons",
  "Controls with different heights",
];

export default function Home() {
  return (
    <div
      className={`${instrument.variable} ${geist.variable} ${jetbrains.variable} ${fraunces.variable} ${spaceGrotesk.variable} theme-landing min-h-screen bg-bg font-body text-base text-fg`}
    >
      <main className="mx-auto max-w-4xl px-4 py-16">
        <header className="mb-16 flex items-baseline justify-between border-b border-line pb-4">
          <span className="font-display text-lg">nogeneric</span>
          <a
            href="https://github.com"
            className="inline-flex items-center gap-1 text-sm text-muted transition-colors duration-150 hover:text-fg"
          >
            <RiGithubLine size={16} />
            GitHub
            <RiArrowRightUpLine size={16} />
          </a>
        </header>

        <p className="rise text-sm uppercase tracking-widest text-muted">
          An open-source skill for Claude Code
        </p>
        <h1 className="rise rise-2 mt-4 mb-6 max-w-2xl font-display text-3xl">
          Your AI can code.
          <br />
          Now make it <span className="italic">design</span>.
        </h1>
        <p className="rise rise-3 mb-16 max-w-lg text-lg text-muted">
          nogeneric makes Claude pick a real direction, lock a token
          system, and refuse the patterns that make every AI page look the
          same.
        </p>

        <section className="rise rise-4 mb-16">
          <p className="mb-2 text-xs uppercase tracking-widest text-subtle">
            The process
          </p>
          <h2 className="mb-6 font-display text-lg">How it works</h2>
          <ol className="flex flex-col">
            {phases.map(([name, desc], i) => (
              <li
                key={name}
                className="grid grid-cols-[64px_1fr] gap-4 border-t border-line py-4"
              >
                <span className="font-display text-lg text-muted">
                  0{i + 1}
                </span>
                <span>
                  <span className="font-medium">{name}.</span>{" "}
                  <span className="text-muted">{desc}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16">
          <p className="mb-2 text-xs uppercase tracking-widest text-accent">
            See it work
          </p>
          <h2 className="mb-2 font-display text-2xl">Three directions, one rule set</h2>
          <p className="mb-6 max-w-xl text-sm text-muted">
            One rule set, three systems. Every page below uses the same locked
            token structure — only the values change.
          </p>
          <div className="grid grid-cols-[1.4fr_1fr] gap-4">
            {showcases.map((s, i) => (
              <Link
                key={s.href}
                href={s.href}
                className={`${s.theme} rise rise-${i + 2} group flex cursor-pointer flex-col justify-between rounded-md border border-line bg-bg no-underline transition-colors duration-200 ease-(--ease-smooth) hover:border-line-strong hover:bg-surface ${
                  s.featured ? "row-span-2 min-h-80 p-6" : "min-h-38 p-5"
                }`}
              >
                <span
                  className={`font-display text-fg ${s.featured ? "text-2xl" : "text-lg"}`}
                >
                  {s.name}
                </span>
                <span className="flex flex-col gap-3">
                  <span className="flex gap-1">
                    <span className="inline-block size-4 rounded-sm border border-line bg-accent" />
                    <span className="inline-block size-4 rounded-sm border border-line bg-surface" />
                    <span className="inline-block size-4 rounded-sm border border-line bg-fg" />
                  </span>
                  <span className="text-sm text-muted">{s.desc}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-accent transition-transform duration-150 group-hover:translate-x-1">
                    View demo
                    <RiArrowRightLine size={16} />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-2 font-display text-lg">One button system</h2>
          <p className="mb-6 max-w-xl text-sm text-muted">
            Four variants, three sizes (sm/md/lg), one radius family. The
            soft variant gets its own token pair — never a transparent hack.
          </p>
          <div className="flex flex-wrap items-center gap-3 border border-line bg-surface p-6">
            <Button>Get started</Button>
            <Button variant="outline">
              Continue
              <RiArrowRightLine size={16} />
            </Button>
            <Button variant="soft">Mark as done</Button>
            <Button variant="danger">Delete</Button>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="mb-6 font-display text-lg">The banned list</h2>
          <ul className="grid grid-cols-2 gap-x-8">
            {banned.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 border-t border-line py-3 text-sm text-muted"
              >
                <RiCloseLine size={16} className="shrink-0 text-danger" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        <footer className="border-t border-line pt-4 text-sm text-muted">
          MIT licensed. Built the way it tells you to build.
        </footer>
      </main>
    </div>
  );
}
