import { formatDate } from "@/lib/utils";

interface Item {
  label: string;
  date: string;
}

export const Timeline = ({ items }: { items: Item[] }) => (
  <div className="relative">
    <div className="absolute left-2 top-0 bottom-0 w-px bg-ink-800" />
    <ul className="space-y-4">
      {items.map((item, idx) => (
        <li key={item.label + idx} className="relative pl-8">
          <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-ink-400 shadow-soft" />
          <p className="text-sm text-ink-100">{item.label}</p>
          <p className="text-xs text-ink-400">{formatDate(item.date)}</p>
        </li>
      ))}
    </ul>
  </div>
);


