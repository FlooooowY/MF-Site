"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAppStore } from "@/stores/useAppStore";

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { currentUserId } = useAppStore();

  useEffect(() => {
    if (!currentUserId && pathname !== "/auth") {
      router.replace("/auth");
    }
  }, [currentUserId, pathname, router]);

  if (!currentUserId && pathname !== "/auth") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-ink-100">
        <div className="glass rounded-2xl p-8 border border-ink-800">
          <p className="text-lg font-semibold">Требуется авторизация</p>
          <p className="text-sm text-ink-400 mt-2">Перенаправляем на страницу входа...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};


