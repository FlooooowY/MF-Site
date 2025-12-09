"use client";

import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = ({ label, className, ...rest }: Props) => (
  <label className="flex flex-col gap-2 text-sm text-ink-200">
    {label && <span className="text-xs uppercase tracking-[0.12em] text-ink-400">{label}</span>}
    <input
      className={clsx(
        "rounded-lg border border-ink-800 bg-ink-900/70 px-3 py-2 text-ink-100",
        "placeholder:text-ink-500 focus:border-ink-500 focus:outline-none focus:ring-2 focus:ring-ink-700",
        className
      )}
      {...rest}
    />
  </label>
);


