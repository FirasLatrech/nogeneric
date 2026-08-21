"use client";

import { useState } from "react";
import {
  RiMailLine,
  RiErrorWarningLine,
  RiCheckLine,
  RiLoader4Line,
} from "@remixicon/react";
import { Button } from "@/components/ui/button";

type Status = "idle" | "sending" | "sent";

function validate(value: string) {
  if (!value.trim()) return "Enter your email so we can send your journal.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
    return "Enter a valid email, like name@company.com";
  }
  return null;
}

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  // Validate on blur; once the field is in error, re-check as they type
  // so the message clears the instant it is fixed.
  const handleChange = (value: string) => {
    setEmail(value);
    if (touched) setError(validate(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = validate(email);
    setTouched(true);
    setError(message);
    if (message) {
      document.getElementById("signup-email")?.focus();
      return;
    }
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };

  if (status === "sent") {
    return (
      <p
        role="status"
        className="rise flex max-w-md items-center gap-2 rounded-md bg-success-soft px-4 py-3 text-sm font-medium text-success-soft-fg"
      >
        <RiCheckLine size={16} className="shrink-0" />
        <span>Check {email} — your first prompt is on its way.</span>
      </p>
    );
  }

  return (
    <form className="rise rise-4 max-w-md" onSubmit={handleSubmit} noValidate>
      <label
        htmlFor="signup-email"
        className="mb-2 block text-sm font-medium text-fg"
      >
        Email address
        <span aria-hidden="true" className="ml-1 text-danger">
          *
        </span>
      </label>

      <div className="flex gap-2">
        <div className="relative min-w-0 flex-1">
          <RiMailLine
            size={16}
            className={`pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 ${
              error ? "text-danger" : "text-muted"
            }`}
          />
          <input
            id="signup-email"
            type="email"
            required
            value={email}
            placeholder="you@example.com"
            aria-invalid={error ? true : undefined}
            aria-describedby={error ? "signup-error" : "signup-hint"}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => {
              setTouched(true);
              setError(validate(email));
            }}
            className={`h-11 w-full cursor-text rounded-md border bg-surface pr-4 pl-10 text-sm text-fg placeholder:text-subtle focus:ring-2 focus:outline-none md:h-12 ${
              error
                ? "border-danger focus:border-danger focus:ring-danger/25"
                : "border-line focus:border-ring focus:ring-ring/25"
            }`}
          />
        </div>
        <Button
          type="submit"
          disabled={status === "sending"}
          className="w-48 whitespace-nowrap"
        >
          {status === "sending" ? (
            <>
              <RiLoader4Line size={16} className="animate-spin" />
              Sending
            </>
          ) : (
            "Start your journal"
          )}
        </Button>
      </div>

      {/* Reserved height: the row never jumps when the error appears. */}
      <div className="mt-2 min-h-8">
        {error ? (
          <p
            id="signup-error"
            role="alert"
            className="flex items-center gap-1 text-xs text-danger"
          >
            <RiErrorWarningLine size={16} className="shrink-0" />
            {error}
          </p>
        ) : (
          <p id="signup-hint" className="text-xs text-subtle">
            Free for your first hundred entries. No app required — it works
            over email.
          </p>
        )}
      </div>
    </form>
  );
}
