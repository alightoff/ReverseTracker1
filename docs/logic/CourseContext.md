# ⚙️ CourseContext

Контекст для хранения и переключения активного курса.

## Содержит

- `activeCourse`: текущий выбранный курс
- `setActiveCourse(course)`: установка курса

## 💾 Хранение

- Использует `localStorage` для сохранения курса между сессиями

## 📦 Использование

```jsx
import { useCourse } from "../context/CourseContext";

const { activeCourse, setActiveCourse } = useCourse();