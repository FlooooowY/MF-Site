"use client";

import { SelectHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  children: ReactNode;
}

export const Select = ({ label, children, className, ...rest }: Props) => (
  <label className="flex flex-col gap-2 text-sm text-ink-200">
    {label && <span className="text-xs uppercase tracking-[0.12em] text-ink-400">{label}</span>}
    <select
      className={clsx(
        "rounded-lg border border-ink-800 bg-ink-900/70 px-3 py-2 text-ink-100",
        "focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-ink-700",
        className
      )}
      {...rest}
    >
      {children}
    </select>
  </label>
);


