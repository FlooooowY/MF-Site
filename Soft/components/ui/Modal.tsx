"use client";

import { ReactNode, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, title, onClose, children }: Props) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur">
      <div className="w-full max-w-lg rounded-2xl glass gradient-border p-6 shadow-glow relative">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm uppercase tracking-[0.12em] text-ink-300">{title}</p>
            <p className="text-xs text-ink-400">Безопасное действие, требуется подтверждение</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-ink-900 border border-ink-800"
            aria-label="Закрыть"
          >
            <XMarkIcon className="w-5 h-5 text-ink-200" />
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>
  );
};


