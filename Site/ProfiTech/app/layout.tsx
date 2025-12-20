import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProfiTech — Оптовый поставщик коммерческого оборудования для HoReCa',
  description: 'Премиальное коммерческое оборудование для ресторанов, кафе и столовых. Оптовые поставки профессиональной техники.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}

