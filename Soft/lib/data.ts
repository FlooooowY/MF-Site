import { Project, PayoutRequest, Transaction, User } from "@/types";

export const users: User[] = [
  {
    id: "u-admin",
    name: "Администратор",
    role: "admin",
    email: "admin@mfdigital.ru",
    passwordHash: "$2b$10$v1bsZYBMvwla860fYxhYL.81d1wou0pTlIWdG72ITObpembSpVsnW",
    createdAt: "2024-01-10T08:00:00Z"
  },
  {
    id: "u-ivanov",
    name: "Иванов",
    role: "manager",
    email: "ivanov@mfdigital.ru",
    passwordHash: "$2b$10$9Dm0eqRua/tXNtJN1r/etOJtcMzhBYAYL59ZxdRihg3GI2weNKy3S",
    createdAt: "2024-02-01T09:00:00Z"
  },
  {
    id: "u-petrov",
    name: "Петров",
    role: "developer",
    email: "petrov@mfdigital.ru",
    passwordHash: "$2b$10$6gp4gGEKhi7CC/YpPvz/teZ9Nrg9bNxafxF.K1P0g0sk1.1CfGK2e",
    createdAt: "2024-02-05T10:00:00Z"
  },
  {
    id: "u-sidorov",
    name: "Сидоров",
    role: "developer",
    email: "sidorov@mfdigital.ru",
    passwordHash: "$2b$10$6gp4gGEKhi7CC/YpPvz/teZ9Nrg9bNxafxF.K1P0g0sk1.1CfGK2e",
    createdAt: "2024-03-01T10:00:00Z"
  },
  {
    id: "u-buh",
    name: "Бухгалтер",
    role: "accountant",
    email: "buh@mfdigital.ru",
    passwordHash: "$2b$10$d3VrBTlxDvQK/ITGCxlaj.fqbeLS..mSYRXe6.ZA2wvzhA6mlv9gu",
    createdAt: "2024-03-15T12:00:00Z"
  }
];

export const projects: Project[] = [
  {
    id: "p-001",
    name: "Сайт для Клиента X",
    client: "Клиент X",
    amount: 100000,
    status: "paid",
    paymentDate: "2024-11-05",
    managerId: "u-ivanov",
    developerIds: ["u-petrov"],
    history: [
      { action: "Создан проект", at: "2024-10-25" },
      { action: "Статус изменен на 'оплачен'", at: "2024-11-05" }
    ]
  },
  {
    id: "p-002",
    name: "TG-бот для Клиента Y",
    client: "Клиент Y",
    amount: 65000,
    status: "pending",
    managerId: "u-ivanov",
    developerIds: ["u-petrov", "u-sidorov"],
    history: [{ action: "Создан проект", at: "2024-12-01" }]
  },
  {
    id: "p-003",
    name: "Автоматизация Z",
    client: "Компания Z",
    amount: 185000,
    status: "completed",
    paymentDate: "2024-09-18",
    managerId: "u-ivanov",
    developerIds: ["u-sidorov"],
    history: [
      { action: "Создан проект", at: "2024-08-25" },
      { action: "Статус изменен на 'оплачен'", at: "2024-09-18" },
      { action: "Завершен", at: "2024-10-02" }
    ]
  }
];

export const transactions: Transaction[] = [
  {
    id: "t-1",
    projectId: "p-001",
    userId: "u-ivanov",
    amount: 10000,
    type: "credit",
    note: "Комиссия менеджера 10%",
    createdAt: "2024-11-05"
  },
  {
    id: "t-2",
    projectId: "p-001",
    userId: "u-petrov",
    amount: 15000,
    type: "credit",
    note: "Комиссия разработчика 15%",
    createdAt: "2024-11-05"
  },
  {
    id: "t-3",
    projectId: "p-003",
    userId: "u-ivanov",
    amount: 18500,
    type: "credit",
    note: "Комиссия менеджера 10%",
    createdAt: "2024-09-18"
  },
  {
    id: "t-4",
    projectId: "p-003",
    userId: "u-sidorov",
    amount: 27750,
    type: "credit",
    note: "Комиссия разработчика 15%",
    createdAt: "2024-09-18"
  },
  {
    id: "t-5",
    projectId: "p-001",
    userId: "u-ivanov",
    amount: -8000,
    type: "debit",
    note: "Выплата по заявке",
    createdAt: "2024-11-12"
  }
];

export const payoutRequests: PayoutRequest[] = [
  {
    id: "w-001",
    userId: "u-ivanov",
    amount: 8000,
    createdAt: "2024-11-10",
    status: "approved",
    comment: "Выплата через банк"
  },
  {
    id: "w-002",
    userId: "u-petrov",
    amount: 12000,
    createdAt: "2024-12-02",
    status: "pending"
  }
];


