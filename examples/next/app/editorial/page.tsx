import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import SignupForm from "./signup-form";
import { Button } from "@/components/ui/button";
import { RiArrowRightLine, RiBookmarkLine } from "@remixicon/react";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-fraunces",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export const metadata: Metadata = { title: "Marginalia — read slowly" };

const essays = [
  {
    title: "On rereading badly",
    body: "Why the second pass through a book you loved is allowed to be lazy, partial, and out of order — and why that's often where the real notes come from.",
    meta: "Saved by 412 readers this week",
    badge: "Weekly pick",
  },
  {
    title: "The case for writing in library books (gently, in pencil)",
    body: "A short defense of marginalia as a conversation with the next borrower, from a librarian who erases them anyway.",
    meta: "Saved by 268 readers this week",
    badge: null,
  },
];

export default function Editorial() {
  return (
    <div
      className={`${fraunces.variable} ${inter.variable} theme-editorial min-h-screen bg-bg font-body text-base leading-relaxed text-fg`}
    >
      <main className="mx-auto max-w-3xl px-4 py-16">
        <header className="mb-16 flex items-center justify-between border-b border-line pb-4">
          <span className="font-display text-lg font-semibold">Marginalia</span>
          <Button as="a" href="#signin" variant="outline">
            Sign in
          </Button>
        </header>

        <p className="rise text-sm tracking-wide text-accent">
          A reading journal
        </p>
        <h1 className="rise rise-2 mt-3 mb-4 font-display text-3xl font-semibold">
          Keep what you read.
          <br />
          Not just the highlights.
        </h1>
        <p className="rise rise-3 mb-6 max-w-lg text-lg text-muted">
          Marginalia turns your notes, underlines, and half-finished thoughts
          into a private commonplace book you&apos;ll actually revisit.
        </p>
        <SignupForm />
        <hr className="my-16 border-0 border-t border-line" />

        <h2 className="mb-4 font-display text-xl font-semibold">
          Recently clipped by readers
        </h2>
        {essays.map((e) => (
          <article
            key={e.title}
            className="mb-4 rounded-lg border border-line bg-surface p-6 transition-colors duration-200 ease-(--ease-smooth) hover:border-line-strong"
          >
            {e.badge && (
              <span className="mb-3 inline-block rounded-sm bg-accent-soft px-2 py-1 text-xs font-medium text-accent-soft-fg">
                {e.badge}
              </span>
            )}
            <h3 className="mb-1 font-display text-lg font-semibold">
              {e.title}
            </h3>
            <p className="max-w-xl text-sm text-muted">{e.body}</p>
            <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
              <span className="inline-flex items-center gap-1 text-xs text-subtle">
                <RiBookmarkLine size={16} />
                {e.meta}
              </span>
              <Button as="a" href="#read" variant="soft">
                Read essay
                <RiArrowRightLine size={16} />
              </Button>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
