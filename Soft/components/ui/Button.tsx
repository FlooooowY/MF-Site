"use client";

import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "ghost" | "outline";
  children: ReactNode;
}

export const Button = ({ variant = "solid", className, children, ...rest }: Props) => (
  <button
    className={clsx(
      "rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-ink-500 focus:ring-offset-1 focus:ring-offset-black",
      {
        "bg-ink-900 text-ink-50 hover:bg-ink-800 shadow-soft": variant === "solid",
        "bg-transparent text-ink-100 hover:bg-ink-900/50 border border-ink-800": variant === "ghost",
        "border border-ink-700 text-ink-100 hover:border-ink-500 hover:bg-ink-900/40":
          variant === "outline"
      },
      className
    )}
    {...rest}
  >
    {children}
  </button>
);


