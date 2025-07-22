/**
 * Утиліта для витягування зображення з JSON-LD структури
 */

export interface ImageObject {
  "@type": "ImageObject";
  "inLanguage": string;
  "@id": string;
  "url": string;
  "contentUrl": string;
  "width": number;
  "height": number;
}

export interface StructuredData {
  "@context": string;
  "@graph": Array<{
    "@type": string;
    "@id": string;
    "primaryImage"?: ImageObject;
    "image"?: ImageObject | ImageObject[];
    [key: string]: unknown;
  }>;
}

/**
 * Витягує URL зображення з JSON-LD структури
 * @param structuredData - JSON-LD структура даних
 * @returns URL зображення або null, якщо не знайдено
 */
export function extractImageFromStructuredData(structuredData: StructuredData): string | null {
  try {
    console.log("🔍 Шукаємо зображення в JSON-LD:", structuredData);
    
    // Шукаємо primaryImage в @graph
    for (const item of structuredData["@graph"]) {
      console.log("📄 Перевіряємо item:", item);
      
      // Перевіряємо primaryImage
      if (item.primaryImage && typeof item.primaryImage === "object") {
        const image = item.primaryImage as ImageObject;
        console.log("🖼️ Знайдено primaryImage:", image);
        if (image.url) {
          console.log("✅ Повертаємо URL:", image.url);
          return image.url;
        }
        if (image.contentUrl) {
          console.log("✅ Повертаємо contentUrl:", image.contentUrl);
          return image.contentUrl;
        }
      }

      // Перевіряємо image (може бути масивом або об'єктом)
      if (item.image) {
        console.log("🖼️ Знайдено image:", item.image);
        if (Array.isArray(item.image)) {
          // Якщо image - це масив, беремо перший елемент
          const firstImage = item.image[0] as ImageObject;
          if (firstImage.url) {
            console.log("✅ Повертаємо URL з масиву:", firstImage.url);
            return firstImage.url;
          }
          if (firstImage.contentUrl) {
            console.log("✅ Повертаємо contentUrl з масиву:", firstImage.contentUrl);
            return firstImage.contentUrl;
          }
        } else if (typeof item.image === "object") {
          // Якщо image - це об'єкт
          const image = item.image as ImageObject;
          if (image.url) {
            console.log("✅ Повертаємо URL з об'єкта:", image.url);
            return image.url;
          }
          if (image.contentUrl) {
            console.log("✅ Повертаємо contentUrl з об'єкта:", image.contentUrl);
            return image.contentUrl;
          }
        }
      }
    }

    console.log("❌ Зображення не знайдено в JSON-LD");
    return null;
  } catch (error) {
    console.error("Помилка при витягуванні зображення з JSON-LD:", error);
    return null;
  }
}

interface ImageGraphObject {
  "@type": "ImageObject";
  inLanguage?: string;
  "@id"?: string;
  url?: string;
  contentUrl?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

interface YoastSchema {
  "@context"?: string;
  "@graph"?: ImageGraphObject[];
}

interface WordPressPost {
  yoast_head_json?: {
    schema?: YoastSchema;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
  featured_image_url?: string;
  [key: string]: unknown;
}

/**
 * Витягує зображення з різних джерел (JSON-LD, WordPress API, fallback)
 * @param post - Пост з WordPress API
 * @param structuredData - JSON-LD структура (опціонально)
 * @returns URL зображення
 */
export function extractImageFromPost(
  post: WordPressPost
): string {
  // 1. Перевіряємо JSON-LD у yoast_head_json.schema
  const graph = post?.yoast_head_json?.schema?.['@graph'];
  if (Array.isArray(graph)) {
    const imageObj = graph.find((item) => item['@type'] === 'ImageObject') as ImageGraphObject | undefined;
    if (imageObj) {
      if (imageObj.url) return imageObj.url;
      if (imageObj.contentUrl) return imageObj.contentUrl;
    }
  }

  // 2. WordPress API стандартні поля
  if (post._embedded?.["wp:featuredmedia"]?.[0]?.source_url) {
    return post._embedded["wp:featuredmedia"][0].source_url;
  }
  if (post.featured_image_url) {
    return post.featured_image_url;
  }

  // 3. Fallback
  return "/images/program-item-video.jpg";
} 