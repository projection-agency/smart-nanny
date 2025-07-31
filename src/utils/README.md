# Утиліти для роботи з зображеннями

## imageExtractor.ts

Утиліта для витягування зображень з різних джерел: JSON-LD структури та WordPress API.

### Використання

```typescript
import { extractImageFromPost, extractImageFromStructuredData } from '@/utils/imageExtractor';

// Витягування зображення з поста (з пріоритетом JSON-LD)
const imageUrl = extractImageFromPost(post, structuredData);

// Витягування тільки з JSON-LD структури
const imageFromJsonLd = extractImageFromStructuredData(structuredData);
```

### Пріоритет джерел зображень

1. **JSON-LD структура** - найвищий пріоритет
2. **WordPress API** (`_embedded["wp:featuredmedia"]`)
3. **Fallback** - `/images/program-item-video.jpg`

### Приклад JSON-LD структури

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "primaryImage": {
        "@type": "ImageObject",
        "url": "https://example.com/image.jpg",
        "contentUrl": "https://example.com/image.jpg",
        "width": 1706,
        "height": 2560
      }
    }
  ]
}
```

### Інтеграція в компоненти

Всі компоненти блогу (`BlogItem`, `BlogSection`, `BlogPage`, `BlogPageItem`) вже оновлені для використання цієї утиліти. 