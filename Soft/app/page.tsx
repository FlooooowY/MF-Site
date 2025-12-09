"use client";

import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/cards/StatCard";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { currency, formatDate } from "@/lib/utils";
import { useAppStore } from "@/stores/useAppStore";
import { ArrowTrendingUpIcon, CurrencyDollarIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function DashboardPage() {
  const { projects, payouts, transactions, getBalance, currentRole } = useAppStore();

  const paidProjects = projects.filter((p) => p.status !== "pending");
  const totalIn = paidProjects.reduce((sum, p) => sum + p.amount, 0);
  const totalOut = transactions.filter((t) => t.type === "debit").reduce((s, t) => s + Math.abs(t.amount), 0);
  const pendingPayouts = payouts.filter((p) => p.status === "pending").length;
  const balancesByUser = useAppStore.getState().users.reduce<Record<string, number>>((acc, u) => {
    acc[u.id] = getBalance(u.id);
    return acc;
  }, {});

  const visiblePayouts =
    currentRole === "manager" || currentRole === "developer"
      ? payouts.filter((p) => p.userId.includes("ivanov") || p.userId.includes("petrov"))
      : payouts;

  return (
    <AppShell>
      <div className="space-y-4">
        <div className="rounded-3xl border border-ink-900 bg-gradient-to-br from-black via-ink-900 to-black p-[1px] shadow-glow">
          <div className="glass rounded-[22px] p-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.12em] text-ink-400">M&F Digital</p>
              <h1 className="mt-2 text-3xl font-semibold text-white">Комиссионные под контролем</h1>
              <p className="mt-2 text-ink-300 max-w-2xl">
                Прозрачный учет сделок, автоматическое начисление процентов и безопасные выплаты.
                Каждый шаг логируется для аудита.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-14 w-14 rounded-2xl bg-ink-900 flex items-center justify-center border border-ink-800">
                <ShieldCheckIcon className="w-7 h-7 text-ink-200" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-ink-400">Оплаченные сделки</p>
                <p className="text-lg font-semibold text-white">{paidProjects.length}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Поступления" value={currency(totalIn)} trend="+12% к прошлому месяцу" icon={<CurrencyDollarIcon className="w-6 h-6 text-ink-200" />} />
          <StatCard title="Выплачено" value={currency(totalOut)} trend="Только подтвержденные заявки" icon={<ShieldCheckIcon className="w-6 h-6 text-ink-200" />} />
          <StatCard title="Заявок на вывод" value={String(pendingPayouts)} trend="Ожидают бухгалтера" icon={<ArrowTrendingUpIcon className="w-6 h-6 text-ink-200" />} />
          <StatCard
            title="Баланс команды"
            value={currency(Object.values(balancesByUser).reduce((s, v) => s + v, 0))}
            trend="С учетом всех начислений"
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <Card title="Последние проекты" className="lg:col-span-2">
            <Table headers={["Проект", "Клиент", "Сумма", "Статус", "Оплата"]}>
              {projects.slice(0, 5).map((p) => (
                <tr key={p.id} className="hover:bg-ink-900/40">
                  <td className="px-4 py-3">
                    <p className="text-sm text-ink-100">{p.name}</p>
                    <p className="text-xs text-ink-400">ID: {p.id}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-200">{p.client}</td>
                  <td className="px-4 py-3 text-ink-100">{currency(p.amount)}</td>
                  <td className="px-4 py-3">
                    <Badge
                      color={
                        p.status === "paid" ? "success" : p.status === "completed" ? "muted" : "warning"
                      }
                    >
                      {p.status === "paid"
                        ? "Оплачен"
                        : p.status === "completed"
                        ? "Завершен"
                        : "Ожидает"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-ink-300">{formatDate(p.paymentDate)}</td>
                </tr>
              ))}
            </Table>
          </Card>

          <Card title="Заявки на вывод">
            <div className="space-y-4">
              {visiblePayouts.slice(0, 4).map((p) => (
                <div key={p.id} className="rounded-xl border border-ink-800 p-3 bg-ink-900/50">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-ink-100">{currency(p.amount)}</p>
                    <Badge
                      color={
                        p.status === "approved" ? "success" : p.status === "pending" ? "warning" : "danger"
                      }
                    >
                      {p.status === "approved"
                        ? "Одобрена"
                        : p.status === "pending"
                        ? "Ожидает"
                        : "Отклонена"}
                    </Badge>
                  </div>
                  <p className="text-xs text-ink-400 mt-1">Создана: {formatDate(p.createdAt)}</p>
                  {p.comment && <p className="text-xs text-ink-300 mt-1">{p.comment}</p>}
                </div>
              ))}
              {!visiblePayouts.length && <p className="text-sm text-ink-400">Нет заявок</p>}
            </div>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}


