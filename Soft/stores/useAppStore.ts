"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import bcrypt from "bcryptjs";
import { projects as initialProjects, payoutRequests as initialPayouts, transactions as initialTx, users as initialUsers } from "@/lib/data";
import { uid } from "@/lib/utils";
import type { CommissionRule, Project, ProjectStatus, PayoutRequest, Role, Transaction, User } from "@/types";

interface AppState {
  users: User[];
  projects: Project[];
  transactions: Transaction[];
  payouts: PayoutRequest[];
  settings: { rules: CommissionRule; notifications: boolean };
  currentUserId: string | null;
  currentRole: Role;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addUser: (payload: { name: string; email: string; role: Role; password: string }) => void;
  createProject: (payload: Omit<Project, "id" | "history">) => void;
  updateProjectStatus: (projectId: string, status: ProjectStatus, paymentDate?: string) => void;
  submitPayout: (userId: string, amount: number) => void;
  updatePayoutStatus: (id: string, status: PayoutRequest["status"], comment?: string) => void;
  cancelPayout: (id: string) => void;
  updateRules: (rules: CommissionRule) => void;
  getBalance: (userId: string) => number;
  getUserTransactions: (userId: string) => Transaction[];
}

const calcBalance = (txs: Transaction[], userId: string) =>
  txs.filter((t) => t.userId === userId).reduce((acc, t) => acc + t.amount, 0);

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set, get) => ({
        users: initialUsers,
        projects: initialProjects,
        transactions: initialTx,
        payouts: initialPayouts,
        settings: { rules: { managerPercent: 10, developerPercent: 15 }, notifications: true },
        currentUserId: null,
        currentRole: "manager",
        login: (email, password) => {
          const user = get().users.find((u) => u.email.toLowerCase() === email.toLowerCase().trim());
          if (!user) return false;
          const ok = bcrypt.compareSync(password, user.passwordHash);
          if (!ok) return false;
          set({ currentUserId: user.id, currentRole: user.role });
          return true;
        },
        logout: () => set({ currentUserId: null, currentRole: "manager" }),
        addUser: ({ name, email, role, password }) =>
          set((state) => ({
            users: [
              ...state.users,
              {
                id: `u-${uid()}`,
                name,
                email: email.toLowerCase(),
                role,
                passwordHash: bcrypt.hashSync(password, 10),
                createdAt: new Date().toISOString()
              }
            ]
          })),
    createProject: (payload) =>
      set((state) => ({
        projects: [
          ...state.projects,
          {
            ...payload,
            id: `p-${uid()}`,
            history: [{ action: "Создан проект", at: new Date().toISOString() }]
          }
        ]
      })),
    updateProjectStatus: (projectId, status, paymentDate) =>
      set((state) => {
        const project = state.projects.find((p) => p.id === projectId);
        if (!project) return state;

        const alreadyPaid = project.status === "paid" || project.status === "completed";
        const nextStatus: ProjectStatus = status;
        const isPaying = nextStatus === "paid" && !alreadyPaid;

        const historyEntry = {
          action: `Статус изменен на '${status === "pending" ? "ожидает оплаты" : status === "paid" ? "оплачен" : "завершен"}'`,
          at: new Date().toISOString()
        };

        const updatedProjects = state.projects.map((p) =>
          p.id === projectId ? { ...p, status: nextStatus, paymentDate: paymentDate ?? p.paymentDate, history: [...p.history, historyEntry] } : p
        );

        let newTx = state.transactions;
        if (isPaying) {
          const hasCredits = state.transactions.some((t) => t.projectId === projectId && t.type === "credit");
          if (!hasCredits) {
            const managerCommission =
              (project.amount * state.settings.rules.managerPercent) / 100;
            const developerCommission =
              (project.amount * state.settings.rules.developerPercent) / 100;

            const managerTx: Transaction = {
              id: `t-${uid()}`,
              projectId,
              userId: project.managerId,
              amount: managerCommission,
              type: "credit",
              note: `Комиссия менеджера ${state.settings.rules.managerPercent}%`,
              createdAt: paymentDate ?? new Date().toISOString()
            };

            const devTx: Transaction[] = project.developerIds.map((devId) => ({
              id: `t-${uid()}`,
              projectId,
              userId: devId,
              amount: developerCommission,
              type: "credit",
              note: `Комиссия разработчика ${state.settings.rules.developerPercent}%`,
              createdAt: paymentDate ?? new Date().toISOString()
            }));

            newTx = [...state.transactions, managerTx, ...devTx];
          }
        }

        return { ...state, projects: updatedProjects, transactions: newTx };
      }),
    submitPayout: (userId, amount) =>
      set((state) => {
        const balance = calcBalance(state.transactions, userId);
        if (amount <= 0 || amount > balance) return state;
        return {
          payouts: [
            ...state.payouts,
            {
              id: `w-${uid()}`,
              userId,
              amount,
              status: "pending",
              createdAt: new Date().toISOString()
            }
          ]
        };
      }),
    updatePayoutStatus: (id, status, comment) =>
      set((state) => {
        const payout = state.payouts.find((p) => p.id === id);
        if (!payout) return state;

        const updatedPayouts = state.payouts.map((p) => (p.id === id ? { ...p, status, comment } : p));
        let newTx = state.transactions;

        if (status === "approved") {
          const tx: Transaction = {
            id: `t-${uid()}`,
            projectId: "manual",
            userId: payout.userId,
            amount: -payout.amount,
            type: "debit",
            note: "Выплата по заявке",
            createdAt: new Date().toISOString()
          };
          newTx = [...state.transactions, tx];
        }

        return { ...state, payouts: updatedPayouts, transactions: newTx };
      }),
    cancelPayout: (id) =>
      set((state) => ({
        payouts: state.payouts.map((p) => (p.id === id && p.status === "pending" ? { ...p, status: "cancelled" } : p))
      })),
    updateRules: (rules) =>
      set((state) => ({
        settings: { ...state.settings, rules }
      })),
    getBalance: (userId) => calcBalance(get().transactions, userId),
    getUserTransactions: (userId) => get().transactions.filter((t) => t.userId === userId)
      }),
      { name: "mf-comm-state" }
    )
  )
);


