"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Modal } from "@/components/ui/Modal";
import { Timeline } from "@/components/cards/Timeline";
import { currency, formatDate } from "@/lib/utils";
import { useAppStore } from "@/stores/useAppStore";
import { ProjectStatus } from "@/types";

export default function ProjectsPage() {
  const { projects, users, createProject, updateProjectStatus, currentRole } = useAppStore();
  const managers = useMemo(() => users.filter((u) => u.role === "manager"), [users]);
  const developers = useMemo(() => users.filter((u) => u.role === "developer"), [users]);

  const [modalProject, setModalProject] = useState<string | null>(null);
  const [status, setStatus] = useState<ProjectStatus>("pending");
  const [paymentDate, setPaymentDate] = useState("");

  const [form, setForm] = useState({
    name: "",
    client: "",
    amount: 50000,
    managerId: managers[0]?.id ?? "",
    developerIds: developers.slice(0, 1).map((d) => d.id),
    status: "pending" as ProjectStatus
  });

  const onCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole !== "admin") return;
    createProject({
      ...form,
      amount: Number(form.amount)
    });
    setForm({ ...form, name: "", client: "" });
  };

  const onStatusChange = () => {
    if (!modalProject) return;
    updateProjectStatus(modalProject, status, paymentDate || undefined);
    setModalProject(null);
    setPaymentDate("");
  };

  const toggleDeveloper = (id: string) => {
    setForm((prev) => ({
      ...prev,
      developerIds: prev.developerIds.includes(id)
        ? prev.developerIds.filter((d) => d !== id)
        : [...prev.developerIds, id]
    }));
  };

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card title="Создание проекта" className="lg:col-span-1">
          <form className="space-y-4" onSubmit={onCreate}>
            <Input
              label="Название"
              placeholder="Сайт для клиента"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
            />
            <Input
              label="Клиент"
              placeholder="Компания"
              value={form.client}
              onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
              required
            />
            <Input
              label="Сумма, ₽"
              type="number"
              min={0}
              value={form.amount}
              onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
              required
            />
            <Select
              label="Менеджер"
              value={form.managerId}
              onChange={(e) => setForm((f) => ({ ...f, managerId: e.target.value }))}
              required
            >
              {managers.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </Select>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.12em] text-ink-400">Разработчики</p>
              <div className="flex flex-wrap gap-2">
                {developers.map((d) => {
                  const active = form.developerIds.includes(d.id);
                  return (
                    <button
                      key={d.id}
                      type="button"
                      onClick={() => toggleDeveloper(d.id)}
                      className={`
                        rounded-lg border px-3 py-2 text-sm transition-all
                        ${active ? "border-ink-500 bg-ink-900 text-ink-50" : "border-ink-800 text-ink-300 hover:border-ink-600"}
                      `}
                    >
                      {d.name}
                    </button>
                  );
                })}
              </div>
            </div>
            <Button type="submit" disabled={currentRole !== "admin"} className="w-full">
              {currentRole === "admin" ? "Создать проект" : "Только администратор может создать"}
            </Button>
          </form>
        </Card>

        <Card title="Список проектов" className="lg:col-span-2">
          <Table headers={["Проект", "Сумма", "Менеджер", "Разработчики", "Статус", "Действия"]}>
            {projects.map((p) => {
              const manager = users.find((u) => u.id === p.managerId)?.name ?? "—";
              const devs = users.filter((u) => p.developerIds.includes(u.id)).map((d) => d.name);
              return (
                <tr key={p.id} className="hover:bg-ink-900/40">
                  <td className="px-4 py-3">
                    <p className="text-sm text-ink-100">{p.name}</p>
                    <p className="text-xs text-ink-400">{p.client}</p>
                  </td>
                  <td className="px-4 py-3 text-ink-100">{currency(p.amount)}</td>
                  <td className="px-4 py-3 text-ink-200">{manager}</td>
                  <td className="px-4 py-3 text-ink-200">{devs.join(", ")}</td>
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
                    <p className="text-[11px] text-ink-400">{formatDate(p.paymentDate)}</p>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        disabled={currentRole !== "admin"}
                        onClick={() => {
                          setModalProject(p.id);
                          setStatus(p.status);
                        }}
                      >
                        Статус
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </Table>
        </Card>
      </div>

      <Card title="История изменений">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <div key={p.id} className="rounded-2xl border border-ink-800 p-4 bg-ink-900/40">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-ink-100">{p.name}</p>
                <Badge color={p.status === "paid" ? "success" : p.status === "completed" ? "muted" : "warning"}>
                  {p.status === "paid" ? "Оплачен" : p.status === "completed" ? "Завершен" : "Ожидает"}
                </Badge>
              </div>
              <Timeline items={p.history.map((h) => ({ label: h.action, date: h.at }))} />
            </div>
          ))}
        </div>
      </Card>

      <Modal
        open={Boolean(modalProject)}
        title="Обновление статуса"
        onClose={() => setModalProject(null)}
      >
        <Select value={status} onChange={(e) => setStatus(e.target.value as ProjectStatus)}>
          <option value="pending">Ожидает оплаты</option>
          <option value="paid">Оплачен (начислить комиссии)</option>
          <option value="completed">Завершен</option>
        </Select>
        <Input
          type="date"
          label="Дата оплаты"
          value={paymentDate}
          onChange={(e) => setPaymentDate(e.target.value)}
        />
        <Button onClick={onStatusChange} disabled={currentRole !== "admin"}>
          {currentRole === "admin" ? "Сохранить" : "Только админ может менять статус"}
        </Button>
      </Modal>
    </AppShell>
  );
}


