import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/**
 * The project's only button. Four variants x three sizes, one radius
 * family. Hover is a colour step — never a lift or a shadow. Needs a
 * new look? Add a variant/size here; never write a second button.
 */
export type ButtonVariant =
  | "primary"
  | "outline"
  | "soft"
  | "danger"
  | "press";

export type ButtonSize = "sm" | "md" | "lg";

// Height + horizontal padding + type scale. Default ("md") is the flat
// --control-h every other control in the app uses, so a button always
// lines up with the input/select/dropdown beside it without either one
// needing an override. sm/lg are opt-in for a row that intentionally
// wants a different scale — see references/components.md.
const sizes: Record<ButtonSize, string> = {
  sm: "h-8 gap-1.5 px-2.5 text-xs",
  md: "h-(--control-h) gap-2 px-5 text-sm",
  lg: "h-11 gap-2 px-4 text-base md:h-12 md:px-5",
};

const base =
  "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md font-medium no-underline transition-[filter,background-color,border-color] duration-200 ease-(--ease-smooth) focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/25 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:brightness-100";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-bg hover:brightness-90",
  outline:
    "border border-line bg-bg text-fg hover:border-line-strong hover:bg-surface-hover",
  soft: "bg-accent-soft text-accent-soft-fg hover:brightness-95",
  danger: "bg-danger text-bg hover:brightness-90",
  // Bordered-loud only: the offset shadow collapsing as the button shifts
  // into it. The one hover that may move an element — it is this
  // direction's identity, and it never applies to cards or rows.
  press:
    "border-4 border-line bg-surface font-display font-bold uppercase text-fg shadow-[4px_4px_0_var(--border)] transition-[box-shadow,transform] duration-150 hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
};

type ButtonProps<T extends ElementType> = {
  as?: T;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

export function Button<T extends ElementType = "button">({
  as,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps<T>) {
  const Tag = (as ?? "button") as ElementType;
  return (
    <Tag
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
