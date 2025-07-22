import Link from "next/link";
import s from "./BlogItem.module.css";
import Image from "next/image";
import React from "react";
import { extractImageFromPost } from "@/utils/imageExtractor";

// Тип для WordPress поста
type WordPressPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  featured_image_url?: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia": { source_url: string }[];
  };
};

// Тип для підготовленого info
type BlogItemInfo = {
  title: string;
  date: string;
  categories: string[];
  description: string;
  slug?: string;
  image?: string;
};

export const BlogItem = ({
  info,
  locale,
  post,
  categories
}: {
  info?: BlogItemInfo;
  locale: string;
  post?: WordPressPost;
  categories?: Array<{ id: number; name: string }>;
}) => {
  // Якщо передано повний пост - витягуємо зображення з нього
  // Інакше використовуємо image з info
  const image = post 
    ? extractImageFromPost(post)
    : info?.image || "/images/program-item-video.jpg";

  // Якщо передано повний пост - формуємо info з нього
  const finalInfo = post ? {
    title: post.title.rendered,
    date: new Date(post.date).toLocaleDateString("uk-UA"),
    categories: categories 
      ? categories
          .filter((cat) => post.categories.includes(cat.id))
          .map((cat) => cat.name)
      : [],
    description: post.excerpt.rendered.replace(/<[^>]+>/g, ""),
    slug: post.slug,
    image: image
  } : info;

  if (!finalInfo) {
    return null;
  }

  return (
    <div
      className={s.itemBlock}
    >
      <Link href={`/${locale}/blog/${finalInfo.slug}`} className={s.item}>
        <div className={s.imageContainer}>
          <Image
            width={1920}
            height={1080}
            alt={finalInfo.categories?.join(", ") || "Категорія"}
            src={image}
          />
        </div>

        <div className={s.content}>
          <div>
            <span>{finalInfo.date}</span>
            {finalInfo.categories && finalInfo.categories.length > 0 && (
              <>
                <div></div>
                {finalInfo.categories.map((cat, idx) => (
                  <React.Fragment key={cat}>
                    <span>{cat}</span>
                    {idx < finalInfo.categories.length - 1 && <div></div>}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>

          <h4>{finalInfo.title}</h4>

          <p>{finalInfo.description}</p>
        </div>
      </Link>
    </div>
  );
};
