export type Role = "admin" | "manager" | "developer" | "accountant";

export type ProjectStatus = "pending" | "paid" | "completed";

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  passwordHash: string;
  createdAt: string;
}

export interface CommissionRule {
  managerPercent: number;
  developerPercent: number;
}

export interface Project {
  id: string;
  name: string;
  client: string;
  amount: number;
  status: ProjectStatus;
  paymentDate?: string;
  managerId: string;
  developerIds: string[];
  history: Array<{ action: string; at: string }>;
}

export interface Transaction {
  id: string;
  projectId: string;
  userId: string;
  amount: number;
  type: "credit" | "debit";
  note: string;
  createdAt: string;
}

export type PayoutStatus = "pending" | "approved" | "declined" | "cancelled";

export interface PayoutRequest {
  id: string;
  userId: string;
  amount: number;
  createdAt: string;
  status: PayoutStatus;
  comment?: string;
}

export interface Settings {
  rules: CommissionRule;
  notifications: boolean;
}


