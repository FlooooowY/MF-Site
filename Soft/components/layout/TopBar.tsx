"use client";

import { useAppStore } from "@/stores/useAppStore";
import { Role } from "@/types";
import { currency } from "@/lib/utils";
import { Select } from "../ui/Select";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const roleLabels: Record<Role, string> = {
  admin: "Администратор",
  manager: "Менеджер",
  developer: "Разработчик",
  accountant: "Бухгалтер"
};

export const TopBar = () => {
  const { setRole, currentRole, getBalance, users } = useAppStore();
  const roleUser =
    currentRole === "manager"
      ? users.find((u) => u.role === "manager")
      : currentRole === "developer"
      ? users.find((u) => u.role === "developer")
      : null;
  const currentBalance = roleUser ? getBalance(roleUser.id) : 0;

  return (
    <header className="sticky top-0 z-30 glass gradient-border rounded-2xl border border-ink-900 px-4 py-3 flex items-center gap-4 justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.14em] text-ink-400">M&F Digital</p>
        <p className="text-sm text-ink-100">Управление комиссионными</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <Select
            value={currentRole}
            onChange={(e) => setRole(e.target.value as Role)}
            aria-label="Выбор роли для предпросмотра"
          >
            {Object.entries(roleLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
        {(currentRole === "manager" || currentRole === "developer") && (
          <div className="text-right">
            <p className="text-[11px] text-ink-400 uppercase tracking-[0.14em]">Баланс</p>
            <p className="text-sm font-semibold text-ink-100">{currency(currentBalance)}</p>
          </div>
        )}
        <Link
          href="/finance"
          className="relative inline-flex items-center justify-center rounded-full border border-ink-800 p-2 hover:bg-ink-900/60"
          aria-label="Уведомления"
        >
          <BellAlertIcon className="w-5 h-5 text-ink-200" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-ink-400 animate-pulse" />
        </Link>
      </div>
    </header>
  );
};

