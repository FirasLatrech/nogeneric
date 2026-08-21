"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a number up to its final value on mount.
 *
 * Pass the display string ("14", "17m", "99.98%") — any non-numeric
 * prefix/suffix is preserved and decimals are matched, so the width
 * never jumps between the first frame and the last.
 *
 * Respects prefers-reduced-motion: the final value renders immediately.
 */
export function CountUp({
  value,
  duration = 900,
  className = "",
}: {
  value: string;
  duration?: number;
  className?: string;
}) {
  const match = value.match(/^(\D*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const numeric = match ? Number(match[2]) : NaN;
  const suffix = match?.[3] ?? "";
  const decimals = match?.[2].split(".")[1]?.length ?? 0;

  // Non-numeric values (e.g. "—") are shown as-is, never animated.
  const animatable = match !== null && Number.isFinite(numeric);

  const [display, setDisplay] = useState(animatable ? 0 : numeric);
  const frame = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!animatable) return;

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setDisplay(numeric);
      return;
    }

    const start = performance.now();
    // easeOutCubic: fast start, gentle settle — no bounce past the value.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(numeric * ease(t));
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
    return () => {
      if (frame.current !== undefined) cancelAnimationFrame(frame.current);
    };
  }, [animatable, numeric, duration]);

  if (!animatable) return <span className={className}>{value}</span>;

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
