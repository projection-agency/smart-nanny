# Google Analytics Integration

Цей файл містить інтеграцію з Google Analytics для відстеження подій на сайті.

## Налаштування

1. Додайте `NEXT_PUBLIC_GA_ID` до вашого `.env.local` файлу:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

2. Компонент `GoogleAnalytics` автоматично підключається до всіх сторінок через `layout.tsx`

## Використання

### Відстеження подій форм

```tsx
import { useAnalytics } from "@/hooks/useAnalytics";

const { trackFormSubmission } = useAnalytics();

// При успішній відправці
trackFormSubmission("form_name", true);

// При помилці
trackFormSubmission("form_name", false);
```

### Відстеження кліків по кнопках

```tsx
import { useAnalytics } from "@/hooks/useAnalytics";

const { trackButtonClick } = useAnalytics();

trackButtonClick("button_name", "location");
```

### Відстеження дзвінків

```tsx
import { PhoneLink } from "@/components/PhoneLink";

<PhoneLink phone="+380123456789">+38 (012) 345-67-89</PhoneLink>;
```

### Відстеження переглядів сторінок

```tsx
import { useAnalytics } from "@/hooks/useAnalytics";

const { trackPageView } = useAnalytics();

trackPageView("page_name");
```

## Константи

Використовуйте константи з `@/constants/analytics` для уніфікації назв:

```tsx
import { FORM_NAMES, BUTTON_NAMES, LOCATIONS } from "@/constants/analytics";

trackFormSubmission(FORM_NAMES.EDUCATION_POPUP, true);
trackButtonClick(BUTTON_NAMES.ORDER_CALL, LOCATIONS.HEADER);
```

## Типи подій

- **Форми**: Відстеження успішних/неуспішних відправок
- **Взаємодія**: Кліки по кнопках, дзвінки
- **Навігація**: Перегляди сторінок
- **Контакти**: Дзвінки за номерами
