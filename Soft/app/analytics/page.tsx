"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { currency } from "@/lib/utils";
import { useAppStore } from "@/stores/useAppStore";

const monthName = (date: string) =>
  new Intl.DateTimeFormat("ru-RU", { month: "short" }).format(new Date(date));

export default function AnalyticsPage() {
  const { projects, transactions, users } = useAppStore();

  const byMonth = projects
    .filter((p) => p.paymentDate)
    .reduce<Record<string, number>>((acc, p) => {
      const key = (p.paymentDate ?? "").slice(0, 7);
      acc[key] = (acc[key] ?? 0) + p.amount;
      return acc;
    }, {});

  const monthEntries = Object.entries(byMonth).sort();
  const maxVal = Math.max(...monthEntries.map(([, v]) => v), 1);

  const topManagers = users
    .filter((u) => u.role === "manager")
    .map((m) => ({
      name: m.name,
      sum: transactions.filter((t) => t.userId === m.id && t.type === "credit").reduce((s, t) => s + t.amount, 0)
    }))
    .sort((a, b) => b.sum - a.sum);

  const topDevs = users
    .filter((u) => u.role === "developer")
    .map((d) => ({
      name: d.name,
      sum: transactions.filter((t) => t.userId === d.id && t.type === "credit").reduce((s, t) => s + t.amount, 0)
    }))
    .sort((a, b) => b.sum - a.sum);

  const payoutsByUser = users
    .filter((u) => u.role !== "admin")
    .map((u) => ({
      name: u.name,
      out: transactions.filter((t) => t.userId === u.id && t.type === "debit").reduce((s, t) => s + Math.abs(t.amount), 0)
    }));

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Поступления по месяцам">
          <div className="space-y-3">
            {monthEntries.length === 0 && <p className="text-sm text-ink-400">Нет данных</p>}
            {monthEntries.map(([month, val]) => (
              <div key={month}>
                <div className="flex justify-between text-xs text-ink-400">
                  <span>{monthName(month + "-01")}</span>
                  <span>{currency(val)}</span>
                </div>
                <div className="mt-1 h-3 rounded-full bg-ink-900/60 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-ink-700 via-ink-500 to-ink-300"
                    style={{ width: `${Math.max(10, (val / maxVal) * 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title="Отчет по выплатам">
          <Table headers={["Сотрудник", "Выплачено"]}>
            {payoutsByUser.map((p) => (
              <tr key={p.name} className="hover:bg-ink-900/40">
                <td className="px-4 py-3 text-ink-200">{p.name}</td>
                <td className="px-4 py-3 text-ink-100">{currency(p.out)}</td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Топ менеджеров">
          <Table headers={["Менеджер", "Комиссия"]}>
            {topManagers.map((m) => (
              <tr key={m.name} className="hover:bg-ink-900/40">
                <td className="px-4 py-3 text-ink-200">{m.name}</td>
                <td className="px-4 py-3 text-ink-100">{currency(m.sum)}</td>
              </tr>
            ))}
          </Table>
        </Card>

        <Card title="Топ разработчиков">
          <Table headers={["Разработчик", "Комиссия"]}>
            {topDevs.map((d) => (
              <tr key={d.name} className="hover:bg-ink-900/40">
                <td className="px-4 py-3 text-ink-200">{d.name}</td>
                <td className="px-4 py-3 text-ink-100">{currency(d.sum)}</td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </AppShell>
  );
}


