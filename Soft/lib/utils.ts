export const currency = (value: number) =>
  new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(
    value
  );

export const formatDate = (value?: string) =>
  value ? new Intl.DateTimeFormat("ru-RU").format(new Date(value)) : "—";

export const uid = () => Math.random().toString(36).slice(2, 9);


