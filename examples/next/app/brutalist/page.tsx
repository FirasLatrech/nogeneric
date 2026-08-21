import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { RiArrowRightLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = { title: "LOUD&CLEAR studio" };

const pieces = [
  {
    tag: "Identity",
    title: "Sabra Hot Sauce",
    body: "A rebrand that put the scoville count on the front, in type big enough to sweat at. Sales up 34% in six months.",
    featured: true,
  },
  {
    tag: "Campaign",
    title: "Metro Nights",
    body: "Poster series for the city's late transit line.",
    featured: false,
  },
  {
    tag: "Packaging",
    title: "Brikk Coffee",
    body: "Bags loud enough to shout over the grinder.",
    featured: false,
  },
];

export default function Brutalist() {
  return (
    <div
      className={`${spaceGrotesk.variable} ${plexMono.variable} theme-brutalist min-h-screen bg-bg font-body text-base text-fg`}
    >
      <main className="mx-auto max-w-5xl px-4 py-10">
        <header className="mb-10 flex items-baseline justify-between border-b-4 border-line pb-3">
          <span className="font-display text-lg font-bold">
            LOUD<em className="not-italic text-accent">&</em>CLEAR
          </span>
          <nav className="flex gap-4">
            {["Work", "Contact"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="border-b-2 border-line text-sm text-fg no-underline transition-colors duration-150 hover:border-accent hover:text-accent"
              >
                {l}
              </a>
            ))}
          </nav>
        </header>

        <h1 className="rise mb-6 max-w-2xl font-display text-3xl font-bold uppercase">
          We make brands you can{" "}
          <span className="bg-accent px-2 text-surface">hear</span> from across
          the street.
        </h1>
        <p className="rise rise-2 mb-6 max-w-md text-sm text-muted">
          A two-person design studio in Tunis. Identity, packaging, and
          campaigns for companies that refuse to whisper.
        </p>
        <Button as="a" href="#contact" variant="press" className="rise rise-3">
          Start a project
          <RiArrowRightLine size={16} />
        </Button>

        <section id="work" className="rise rise-4 mt-16 grid grid-cols-[2fr_1fr] gap-4">
          {pieces.map((p) => (
            <article
              key={p.title}
              className={`border-4 border-line bg-surface p-6 ${p.featured ? "row-span-2 flex flex-col" : ""}`}
            >
              <span className="mb-3 self-start bg-fg px-2 py-1 text-xs uppercase tracking-wider text-bg">
                {p.tag}
              </span>
              <h2 className="mb-2 font-display text-xl font-bold">{p.title}</h2>
              <p className="text-sm text-muted">{p.body}</p>
              {p.featured && (
                <p className="mt-auto pt-6 font-display font-bold uppercase">
                  <span className="block text-3xl text-accent">+34%</span>
                  <span className="text-xs tracking-wider text-muted">
                    shelf sales, six months after launch
                  </span>
                </p>
              )}
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
