"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAppStore } from "@/stores/useAppStore";
import { currency, formatDate } from "@/lib/utils";
import { useMemo, useState } from "react";

export default function FinancePage() {
  const {
    currentRole,
    users,
    getBalance,
    getUserTransactions,
    submitPayout,
    payouts,
    updatePayoutStatus,
    cancelPayout
  } = useAppStore();

  const roleUserId =
    currentRole === "manager"
      ? "u-ivanov"
      : currentRole === "developer"
      ? "u-petrov"
      : currentRole === "accountant"
      ? null
      : null;

  const [amount, setAmount] = useState(5000);
  const [comment, setComment] = useState("");

  const visiblePayouts = useMemo(() => {
    if (currentRole === "accountant" || currentRole === "admin") return payouts;
    return payouts.filter((p) => p.userId === roleUserId);
  }, [currentRole, payouts, roleUserId]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleUserId) return;
    submitPayout(roleUserId, amount);
    setAmount(3000);
  };

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Баланс" className="lg:col-span-1">
          {currentRole === "manager" || currentRole === "developer" ? (
            <div className="space-y-3">
              <p className="text-3xl font-semibold text-white">{currency(getBalance(roleUserId!))}</p>
              <p className="text-sm text-ink-400">Доступно к выводу после одобрения бухгалтера</p>
              <form className="space-y-3" onSubmit={submit}>
                <Input
                  label="Сумма заявки"
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  required
                />
                <Button type="submit">Отправить заявку</Button>
              </form>
            </div>
          ) : (
            <div className="space-y-2">
              {users
                .filter((u) => u.role !== "admin")
                .map((u) => (
                  <div key={u.id} className="flex items-center justify-between border border-ink-800 rounded-xl px-3 py-2 bg-ink-900/40">
                    <div>
                      <p className="text-sm text-ink-100">{u.name}</p>
                      <p className="text-xs text-ink-400">{u.role}</p>
                    </div>
                    <p className="text-sm font-semibold text-white">{currency(getBalance(u.id))}</p>
                  </div>
                ))}
            </div>
          )}
        </Card>

        <Card title="Транзакции" className="lg:col-span-2">
          <Table headers={["Тип", "Проект", "Сумма", "Комментарий", "Дата"]}>
            {(currentRole === "admin" || currentRole === "accountant"
              ? users.flatMap((u) => getUserTransactions(u.id))
              : getUserTransactions(roleUserId!)
            ).map((t) => (
              <tr key={t.id} className="hover:bg-ink-900/40">
                <td className="px-4 py-3">
                  <Badge color={t.type === "credit" ? "success" : "danger"}>
                    {t.type === "credit" ? "Начисление" : "Выплата"}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-ink-200">{t.projectId}</td>
                <td className="px-4 py-3 text-ink-100">{currency(t.amount)}</td>
                <td className="px-4 py-3 text-ink-300">{t.note}</td>
                <td className="px-4 py-3 text-ink-400">{formatDate(t.createdAt)}</td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>

      <Card title="Заявки на вывод">
        <Table headers={["Сотрудник", "Сумма", "Статус", "Дата", "Комментарий", "Действия"]} dense>
          {visiblePayouts.map((p) => {
            const user = users.find((u) => u.id === p.userId);
            return (
              <tr key={p.id} className="hover:bg-ink-900/40">
                <td className="px-3 py-2 text-ink-200">{user?.name ?? p.userId}</td>
                <td className="px-3 py-2 text-ink-100">{currency(p.amount)}</td>
                <td className="px-3 py-2">
                  <Badge
                    color={
                      p.status === "approved" ? "success" : p.status === "pending" ? "warning" : "danger"
                    }
                  >
                    {p.status === "approved"
                      ? "Одобрена"
                      : p.status === "pending"
                      ? "Ожидает"
                      : p.status === "cancelled"
                      ? "Отменена"
                      : "Отклонена"}
                  </Badge>
                </td>
                <td className="px-3 py-2 text-ink-400">{formatDate(p.createdAt)}</td>
                <td className="px-3 py-2 text-ink-300">{p.comment ?? "—"}</td>
                <td className="px-3 py-2">
                  {currentRole === "accountant" && p.status === "pending" && (
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => updatePayoutStatus(p.id, "approved", comment)}>
                        Одобрить
                      </Button>
                      <Button variant="ghost" onClick={() => updatePayoutStatus(p.id, "declined", comment)}>
                        Отклонить
                      </Button>
                    </div>
                  )}
                  {(currentRole === "manager" || currentRole === "developer") &&
                    p.status === "pending" &&
                    p.userId === roleUserId && (
                      <Button variant="ghost" onClick={() => cancelPayout(p.id)}>
                        Отменить
                      </Button>
                    )}
                </td>
              </tr>
            );
          })}
        </Table>
        {currentRole === "accountant" && (
          <div className="mt-3">
            <Input
              label="Комментарий бухгалтера (опционально)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Реквизиты, дата выплаты и т.д."
            />
          </div>
        )}
      </Card>
    </AppShell>
  );
}


