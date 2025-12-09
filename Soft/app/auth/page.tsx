"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/stores/useAppStore";

const demoCreds = [
  { role: "Админ", email: "admin@mfdigital.ru", pass: "admin123" },
  { role: "Менеджер", email: "ivanov@mfdigital.ru", pass: "manager123" },
  { role: "Разработчик", email: "petrov@mfdigital.ru", pass: "dev123" },
  { role: "Бухгалтер", email: "buh@mfdigital.ru", pass: "acc123" }
];

export default function AuthPage() {
  const [email, setEmail] = useState("admin@mfdigital.ru");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAppStore();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(email, password);
    if (!ok) {
      setError("Неверный email или пароль");
      return;
    }
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-diagonal-gradient">
      <Card className="max-w-lg w-full">
        <p className="text-xs uppercase tracking-[0.12em] text-ink-400 mb-2">M&F Digital</p>
        <h1 className="text-2xl font-semibold text-white">Вход в систему</h1>
        <p className="text-sm text-ink-400 mb-6">Авторизация для управления комиссионными.</p>

        <form className="space-y-4" onSubmit={onSubmit}>
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input
            label="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-sm text-red-300">{error}</p>}
          <Button type="submit" className="w-full">
            Войти
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-ink-800 p-3 bg-ink-900/40">
          <p className="text-xs uppercase tracking-[0.12em] text-ink-400 mb-2">Демо-учётки</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {demoCreds.map((c) => (
              <button
                key={c.email}
                type="button"
                onClick={() => {
                  setEmail(c.email);
                  setPassword(c.pass);
                }}
                className="rounded-lg border border-ink-800 px-3 py-2 text-left hover:border-ink-600"
              >
                <p className="text-sm text-ink-100">{c.role}</p>
                <p className="text-xs text-ink-400">{c.email}</p>
                <p className="text-xs text-ink-500">Пароль: {c.pass}</p>
              </button>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}


