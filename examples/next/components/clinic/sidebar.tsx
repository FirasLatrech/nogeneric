"use client";

import { useState } from "react";
import { CountUp } from "@/components/ui/count-up";
import {
  WidgetBoldDuotoneIcon,
  WidgetBoldIcon,
  CalendarBoldDuotoneIcon,
  CalendarBoldIcon,
  UserHeartBoldDuotoneIcon,
  UserHeartBoldIcon,
  PillBoldDuotoneIcon,
  PillBoldIcon,
  TestTubeBoldDuotoneIcon,
  TestTubeBoldIcon,
  SettingsBoldDuotoneIcon,
  HeartPulseBoldDuotoneIcon,
  AltArrowLeftBoldDuotoneIcon,
  AltArrowRightBoldDuotoneIcon,
} from "@solar-icons/react";

// Solar ships each weight as its own export. Duotone by default;
// the active item steps up to solid Bold so it still reads as selected.
const nav = [
  { label: "Overview", Icon: WidgetBoldDuotoneIcon, IconActive: WidgetBoldIcon, active: true },
  { label: "Schedule", Icon: CalendarBoldDuotoneIcon, IconActive: CalendarBoldIcon, active: false },
  { label: "Patients", Icon: UserHeartBoldDuotoneIcon, IconActive: UserHeartBoldIcon, active: false },
  { label: "Prescriptions", Icon: PillBoldDuotoneIcon, IconActive: PillBoldIcon, active: false },
  { label: "Lab results", Icon: TestTubeBoldDuotoneIcon, IconActive: TestTubeBoldIcon, active: false, badge: "3" },
];

export function Sidebar() {
  const [open, setOpen] = useState(true);

  return (
    <aside
      className={`ml-4 flex shrink-0 flex-col rounded-lg bg-surface transition-[width] duration-200 ease-(--ease-smooth) ${
        open ? "w-64" : "w-18"
      }`}
    >
      {/* Brand + collapse toggle */}
      <div
        className={`flex h-16 items-center ${open ? "gap-2 px-5" : "justify-center px-0"}`}
      >
        <HeartPulseBoldDuotoneIcon size={24} className="shrink-0 text-accent" />
        {open && (
          <span className="flex-1 truncate font-display text-lg font-bold tracking-tight">
            Meridian
          </span>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={open}
          className={`flex size-8 cursor-pointer items-center justify-center rounded-md text-muted transition-colors duration-150 hover:bg-surface-hover hover:text-fg focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:outline-none ${
            open ? "" : "absolute left-13"
          }`}
        >
          {open ? (
            <AltArrowLeftBoldDuotoneIcon size={20} />
          ) : (
            <AltArrowRightBoldDuotoneIcon size={20} />
          )}
        </button>
      </div>

      {/* Nav — tight spacing, green icons, active gets a soft green block */}
      <nav className={`flex flex-1 flex-col gap-0.5 ${open ? "p-3" : "p-2"}`}>
        {nav.map(({ label, Icon, IconActive, active, badge }) => (
          <a
            key={label}
            href="#"
            title={open ? undefined : label}
            aria-current={active ? "page" : undefined}
            className={`flex h-11 cursor-pointer items-center rounded-md text-base no-underline transition-colors duration-150 ease-(--ease-smooth) focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:outline-none ${
              open ? "gap-3 px-3" : "justify-center px-0"
            } ${
              active
                ? "bg-accent-soft font-semibold text-accent-soft-fg"
                : "text-fg hover:bg-surface-hover"
            }`}
          >
            {active ? (
              <IconActive size={22} className="shrink-0 text-accent" />
            ) : (
              <Icon size={22} className="shrink-0 text-accent" />
            )}
            {open && <span className="flex-1 truncate">{label}</span>}
            {open && badge && (
              <span className="rounded-sm bg-danger px-1.5 py-0.5 text-xs font-semibold text-surface">
                <CountUp value={badge} duration={600} />
              </span>
            )}
          </a>
        ))}
      </nav>

      {/* Footer */}
      <div className={open ? "p-3" : "p-2"}>
        <a
          href="#"
          title={open ? undefined : "Settings"}
          className={`flex h-11 cursor-pointer items-center rounded-md text-base text-fg no-underline transition-colors duration-150 hover:bg-surface-hover focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:outline-none ${
            open ? "gap-3 px-3" : "justify-center px-0"
          }`}
        >
          <SettingsBoldDuotoneIcon size={22} className="shrink-0 text-accent" />
          {open && <span className="flex-1 truncate">Settings</span>}
        </a>

        <div
          className={`mt-2 flex items-center rounded-md py-2 ${
            open ? "gap-3 px-3" : "justify-center px-0"
          }`}
        >
          <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent font-display text-xs font-bold text-surface">
            LR
          </span>
          {open && (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">
                Dr. Leila Romdhane
              </span>
              <span className="block truncate text-xs text-subtle">
                Cardiology
              </span>
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
