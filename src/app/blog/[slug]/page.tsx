"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import s from "./article.module.css";
import Image from "next/image";
import { API_URL } from "@/constants";

export type BlogPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia": { source_url: string }[];
  };
};

export default function BlogPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}v2/posts?slug=${slug}&_embed=1`);
        const data: BlogPost[] = await res.json();

        if (data[0]) {
          setPost(data[0]);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Помилка при завантаженні поста:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return <div className={s.loading}>Завантаження…</div>;
  }

  if (!post) {
    return <div className={s.notFound}>Пост не знайдено</div>;
  }

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/images/program-item-video.jpg";

  const formattedDate = new Date(post.date).toLocaleDateString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <main>
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.titleContainer}>
            <div>
              <span>{formattedDate}</span>
              <div></div>
              <span>Навчання та поради</span>
            </div>

            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>

          <div className={s.imageContainer}>
            <Image
              width={1920}
              height={1080}
              src={image}
              alt={post.title.rendered}
            />
          </div>

          <div
            className={s.textContainer}
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />
        </div>
      </section>
    </main>
  );
}
