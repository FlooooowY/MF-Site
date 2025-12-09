"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  ChartPieIcon,
  Cog6ToothIcon,
  CurrencyDollarIcon,
  HomeModernIcon,
  RectangleGroupIcon
} from "@heroicons/react/24/outline";
import { Role } from "@/types";

const links = [
  { href: "/", label: "Дашборд", icon: HomeModernIcon },
  { href: "/projects", label: "Проекты", icon: RectangleGroupIcon },
  { href: "/finance", label: "Финансы", icon: CurrencyDollarIcon },
  { href: "/analytics", label: "Аналитика", icon: ChartPieIcon },
  { href: "/settings", label: "Настройки", icon: Cog6ToothIcon }
];

const roleLabels: Record<Role, string> = {
  admin: "Администратор",
  manager: "Менеджер",
  developer: "Разработчик",
  accountant: "Бухгалтер"
};

interface Props {
  role: Role;
}

export const Sidebar = ({ role }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 glass gradient-border p-5 border border-ink-900">
      <div className="pb-6 border-b border-ink-800">
        <div className="text-lg font-semibold tracking-tight">M&F Digital</div>
        <p className="text-sm text-ink-400">Комиссионные вознаграждения</p>
      </div>

      <div className="mt-6 mb-4 text-xs uppercase tracking-[0.12em] text-ink-400">Навигация</div>
      <nav className="space-y-1">
        {links.map((link) => {
          const active = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-200",
                active
                  ? "bg-ink-900 text-white shadow-soft border border-ink-700"
                  : "text-ink-200 hover:bg-ink-900/60 border border-transparent hover:border-ink-800"
              )}
            >
              <Icon className="w-5 h-5" />
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-ink-800">
        <p className="text-xs uppercase tracking-[0.12em] text-ink-400">Текущая роль</p>
        <p className="text-sm font-semibold text-ink-100">{roleLabels[role]}</p>
      </div>
    </aside>
  );
};

