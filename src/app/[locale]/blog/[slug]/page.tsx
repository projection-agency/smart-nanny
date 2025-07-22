import type { Metadata } from 'next'
import BlogPageItem, { BlogPost } from "@/components/BlogPageItem/BlogPageItem";
import { API_URL } from "@/constants";
import { extractImageFromPost } from "@/utils/imageExtractor";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  
  try {
    const res = await fetch(`${API_URL}v2/posts?slug=${slug}&lang=${locale}`);
    const posts: BlogPost[] = await res.json();
    const post = posts[0];

    if (!post) {
      return {
        title: 'Пост не знайдено - Smart Nanny',
        description: 'Запитаний пост не знайдено.',
      }
    }

    const image = extractImageFromPost(post);
    const title = post.title.rendered.replace(/<[^>]+>/g, '');
    const description = post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160);

    return {
      title: `${title} - Smart Nanny`,
      description,
      openGraph: {
        title,
        description,
        url: `https://smart-nanny.com/${locale}/blog/${slug}`,
        siteName: 'Smart Nanny',
        images: [
          {
            url: image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
        locale: locale === 'ua' ? 'uk_UA' : 'en_US',
        type: 'article',
        publishedTime: post.date,
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [image],
      },
      alternates: {
        canonical: `https://smart-nanny.com/${locale}/blog/${slug}`,
        languages: {
          'uk-UA': `https://smart-nanny.com/ua/blog/${slug}`,
          'en-US': `https://smart-nanny.com/en/blog/${slug}`,
        },
      },
    }
  } catch {
    return {
      title: 'Помилка завантаження - Smart Nanny',
      description: 'Не вдалося завантажити пост.',
    }
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  await params; // Await params to satisfy TypeScript
  return <BlogPageItem />;
}
