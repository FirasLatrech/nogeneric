import type { Metadata } from "next";
import { Archivo, Source_Sans_3 } from "next/font/google";
import {
  MinimalisticMagnifierBoldDuotoneIcon,
  BellBoldDuotoneIcon,
  AddSquareBoldDuotoneIcon,
  AltArrowRightBoldDuotoneIcon,
  UserHeartBoldDuotoneIcon,
} from "@solar-icons/react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/clinic/sidebar";
import { CountUp } from "@/components/ui/count-up";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-archivo",
});
const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-source-sans",
});

export const metadata: Metadata = { title: "Meridian Clinic — today" };


const stats = [
  { label: "Seen today", value: "14", of: "of 19 booked" },
  { label: "Waiting now", value: "3", of: "longest 12 min" },
  { label: "Avg. consult", value: "17m", of: "target 15m" },
];

const appointments = [
  { time: "09:00", name: "Amira Ben Salah", reason: "Post-op review — knee", status: "Seen" },
  { time: "09:20", name: "Marc Delacroix", reason: "Hypertension follow-up", status: "Seen" },
  { time: "09:45", name: "Yosra Trabelsi", reason: "Chest pain, 3 days", status: "In room" },
  { time: "10:10", name: "Karim Haddad", reason: "Annual check-up", status: "Waiting" },
  { time: "10:30", name: "Ines Gharbi", reason: "Lab results — thyroid", status: "Waiting" },
];

const statusStyles: Record<string, string> = {
  Seen: "bg-success-soft text-success-soft-fg",
  "In room": "bg-accent-soft text-accent-soft-fg",
  Waiting: "bg-surface-hover text-muted",
};

export default function Clinic() {
  return (
    <div
      className={`${archivo.variable} ${sourceSans.variable} theme-clinic min-h-screen bg-bg font-body text-base text-fg`}
    >
      <div className="flex min-h-screen gap-4 py-4 pr-4">
        <Sidebar />

        {/* Main column */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-16 shrink-0 items-center gap-4 rounded-lg bg-surface px-5">
            <label className="relative hidden min-w-0 flex-1 md:block">
              <span className="sr-only">Search patients</span>
              <MinimalisticMagnifierBoldDuotoneIcon
                size={20}
                className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted"
              />
              <input
                type="search"
                placeholder="Search patients, files, prescriptions…"
                className="h-11 w-full max-w-md cursor-text rounded-md border border-line bg-bg pr-3 pl-11 text-base text-fg placeholder:text-subtle focus:border-ring focus:ring-2 focus:ring-ring/25 focus:outline-none md:h-12"
              />
            </label>

            <button
              type="button"
              aria-label="Notifications, 2 unread"
              className="relative flex size-11 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-surface-hover hover:text-fg md:size-12"
            >
              <BellBoldDuotoneIcon size={22} />
              <span className="absolute top-2 right-2 size-2 rounded-lg bg-danger" />
            </button>

            <Button>
              <AddSquareBoldDuotoneIcon size={20} />
              New appointment
            </Button>
          </header>

          {/* Content + aside */}
          <div className="flex min-w-0 flex-1 flex-col gap-6 pt-6 xl:flex-row">
            <main className="min-w-0 flex-1">
              <p className="rise text-sm font-semibold uppercase tracking-widest text-accent">
                Thursday, 21 August
              </p>
              <h1 className="rise rise-2 mt-1 mb-6 font-display text-2xl font-bold tracking-tight">
                Good morning, Dr. Romdhane
              </h1>

              <div className="rise rise-3 mb-6 grid gap-4 sm:grid-cols-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-lg border border-line bg-surface p-4"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wider text-subtle">
                      {s.label}
                    </p>
                    <p className="mt-1 font-display text-2xl font-bold">
                      <CountUp value={s.value} />
                    </p>
                    <p className="text-sm text-muted">{s.of}</p>
                  </div>
                ))}
              </div>

              <section className="rise rise-4 rounded-lg border border-line bg-surface">
                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <h2 className="font-display text-base font-semibold">
                    Today&apos;s schedule
                  </h2>
                  <Button as="a" href="#schedule" variant="soft">
                    Full day
                    <AltArrowRightBoldDuotoneIcon size={20} />
                  </Button>
                </div>
                <table className="w-full text-base">
                  <caption className="sr-only">
                    Appointments for Thursday, 21 August
                  </caption>
                  <thead>
                    <tr>
                      {["Time", "Patient", "Reason", "Status"].map((h, i) => (
                        <th
                          key={h}
                          scope="col"
                          className={`border-b border-line px-5 py-3 text-sm font-semibold uppercase tracking-wider text-subtle ${
                            i === 3 ? "text-right" : "text-left"
                          }`}
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a) => (
                      <tr
                        key={a.time}
                        className="transition-colors duration-150 hover:bg-surface-hover"
                      >
                        <td className="border-b border-line px-5 py-3 font-display tabular-nums">
                          {a.time}
                        </td>
                        <td className="border-b border-line px-5 py-3 font-semibold">
                          {a.name}
                        </td>
                        <td className="border-b border-line px-5 py-3 text-muted">
                          {a.reason}
                        </td>
                        <td className="border-b border-line px-5 py-3 text-right">
                          <span
                            className={`inline-block rounded-sm px-2 py-1 text-sm font-semibold ${statusStyles[a.status]}`}
                          >
                            {a.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </main>

            {/* Aside — empty state, designed not defaulted */}
            <aside className="w-full shrink-0 xl:w-80">
              <section className="rise rise-5 rounded-lg border border-line bg-surface p-5">
                <h2 className="font-display text-base font-semibold">
                  Patient detail
                </h2>
                <p className="mt-1 text-base text-muted">
                  Select a patient from the schedule to see their history,
                  medications, and recent labs here.
                </p>
                <div className="mt-5 flex flex-col items-start gap-3 rounded-md border border-dashed border-line-strong p-4">
                  <UserHeartBoldDuotoneIcon size={24} className="text-accent" />
                  <p className="text-base font-semibold">No patient selected</p>
                  <p className="text-sm text-muted">
                    Yosra Trabelsi is in room 2 and has an open chart.
                  </p>
                  <Button as="a" href="#patient" variant="outline">
                    Open her chart
                    <AltArrowRightBoldDuotoneIcon size={20} />
                  </Button>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
