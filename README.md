# ProfiTech — B2B Каталог коммерческого оборудования

Премиальный B2B-каталог для оптового поставщика коммерческого оборудования для HoReCa (рестораны, кафе, столовые).

## Технологии

- **Next.js 14** — React фреймворк с App Router
- **TypeScript** — типобезопасность
- **Tailwind CSS** — стилизация
- **Framer Motion** — анимации
- **Zustand** — управление состоянием (корзина)
- **Nodemailer** — отправка email заявок

## Установка

1. Установите зависимости:
```bash
npm install
```

2. Создайте файл `.env.local` в корне проекта:
```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
ORDER_EMAIL=orders@profitech.ru
```

3. Запустите dev сервер:
```bash
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## Функционал

- ✅ Каталог товаров с фильтрацией по категориям
- ✅ Поиск по каталогу
- ✅ Корзина с сохранением в localStorage
- ✅ Оформление заявок с отправкой на email
- ✅ Админ-панель для управления товарами (`/admin`)
- ✅ Адаптивный дизайн
- ✅ Плавные анимации и hover-эффекты
- ✅ Премиальный UI/UX дизайн

## Структура проекта

```
├── app/              # Next.js App Router
│   ├── admin/       # Админ-панель
│   ├── api/         # API routes
│   ├── globals.css  # Глобальные стили
│   ├── layout.tsx   # Корневой layout
│   └── page.tsx     # Главная страница
├── components/       # React компоненты
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Catalog.tsx
│   ├── ProductCard.tsx
│   ├── Cart.tsx
│   ├── OrderForm.tsx
│   └── Footer.tsx
└── lib/             # Утилиты и store
    ├── store.ts     # Zustand store
    └── products.ts  # Данные товаров
```

## Цветовая схема

- **Основной фон**: `#FCFDFF`
- **Основной акцент**: `#2A5B87`
- **Доп. акцент**: `#D4A373`
- **Текст**: `#5E728C`, `#869AB8`

## Сборка для продакшена

```bash
npm run build
npm start
```

