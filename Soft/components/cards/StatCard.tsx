import { ReactNode } from "react";
import { Card } from "../ui/Card";

interface Props {
  title: string;
  value: string;
  trend?: string;
  icon?: ReactNode;
}

export const StatCard = ({ title, value, trend, icon }: Props) => (
  <Card className="card-tilt">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-ink-400">{title}</p>
        <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
        {trend && <p className="text-xs text-ink-400 mt-1">{trend}</p>}
      </div>
      {icon && <div className="rounded-xl bg-ink-900/70 p-3 border border-ink-800">{icon}</div>}
    </div>
  </Card>
);


