import { ReactNode } from "react";
import clsx from "clsx";

interface Props {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}

export const Card = ({ title, action, children, className }: Props) => (
  <div className={clsx("glass gradient-border rounded-2xl p-5 relative overflow-hidden", className)}>
    {title && (
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm uppercase tracking-[0.08em] text-ink-300">{title}</p>
        {action}
      </div>
    )}
    {children}
  </div>
);


