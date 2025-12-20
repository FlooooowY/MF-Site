"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { useAppStore } from "@/stores/useAppStore";
import { useState } from "react";

export default function SettingsPage() {
  const { settings, updateRules, users, currentRole } = useAppStore();
  const [managerPercent, setManagerPercent] = useState(settings.rules.managerPercent);
  const [developerPercent, setDeveloperPercent] = useState(settings.rules.developerPercent);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentRole !== "admin") return;
    updateRules({ managerPercent, developerPercent });
  };

  return (
    <AppShell>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="Комиссионные правила">
          <form className="space-y-4" onSubmit={save}>
            <Input
              label="Процент менеджера"
              type="number"
              min={0}
              max={100}
              value={managerPercent}
              onChange={(e) => setManagerPercent(Number(e.target.value))}
            />
            <Input
              label="Процент разработчика"
              type="number"
              min={0}
              max={100}
              value={developerPercent}
              onChange={(e) => setDeveloperPercent(Number(e.target.value))}
            />
            <Button type="submit" disabled={currentRole !== "admin"}>
              {currentRole === "admin" ? "Сохранить" : "Только администратор"}
            </Button>
          </form>
        </Card>

        <Card title="Пользователи">
          <Table headers={["Имя", "Роль", "Email"]}>
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-ink-900/40">
                <td className="px-4 py-3 text-ink-100">{u.name}</td>
                <td className="px-4 py-3 text-ink-200">{u.role}</td>
                <td className="px-4 py-3 text-ink-300">{u.email}</td>
              </tr>
            ))}
          </Table>
        </Card>
      </div>
    </AppShell>
  );
}


