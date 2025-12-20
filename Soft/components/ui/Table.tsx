import { ReactNode } from "react";
import clsx from "clsx";

interface TableProps {
  headers: string[];
  children: ReactNode;
  dense?: boolean;
}

export const Table = ({ headers, children, dense }: TableProps) => (
  <div className="overflow-hidden rounded-xl border border-ink-800 glass">
    <table className={clsx("w-full text-sm", dense && "text-xs")}>
      <thead className="bg-ink-900/50 text-ink-300 uppercase tracking-[0.08em]">
        <tr>
          {headers.map((h) => (
            <th key={h} className="px-4 py-3 text-left font-semibold">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-ink-800">{children}</tbody>
    </table>
  </div>
);


