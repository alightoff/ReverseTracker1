# 🧩 GlobalNavDrawer

Выезжающее меню с навигацией по страницам.

## ⚙️ Props

- `open`: `boolean` — состояние (открыто/закрыто)
- `onClose`: `function` — вызывается при закрытии

## 🧠 Использует

- `useLocation()` из `react-router-dom` — подсветка активной ссылки
- `framer-motion` — анимация появления

## 📦 Использование

```jsx
<GlobalNavDrawer open={open} onClose={() => setOpen(false)} />