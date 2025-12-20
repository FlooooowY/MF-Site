import clsx from "clsx";
import { ReactNode } from "react";

interface Props {
  color?: "muted" | "success" | "warning" | "danger";
  children: ReactNode;
}

export const Badge = ({ color = "muted", children }: Props) => (
  <span
    className={clsx(
      "inline-flex items-center gap-1 rounded-full px-3 py-1 text-[12px] font-semibold",
      {
        "bg-ink-800 text-ink-200": color === "muted",
        "bg-[#0f2d17] text-[#b4f0c2] border border-[#1f5430]": color === "success",
        "bg-[#2d2a0f] text-[#f0e5b4] border border-[#54501f]": color === "warning",
        "bg-[#2d0f0f] text-[#f0b4b4] border border-[#541f1f]": color === "danger"
      }
    )}
  >
    {children}
  </span>
);


