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

export default async function BlogPage({
  params,
}: {
  params: { slug: string };
}) {
  const res = await fetch(`${API_URL}v2/posts?slug=${params.slug}&_embed=1`);
  const data: BlogPost[] = await res.json();
  const post = data[0];

  if (!post) return <div>Статтю не знайдено</div>;

  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
    "/images/default-blog.jpg";

  return (
    <main>
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.titleContainer}>
            <div>
              <span>
                {new Date(post.date).toLocaleDateString("uk-UA", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </span>
              <div></div>
              <span>Навчання та поради</span>
            </div>

            <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            <p
              dangerouslySetInnerHTML={{
                __html: post.excerpt.rendered,
              }}
            />
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

      {/* Читати далі можна динамічно підвантажити окремо */}
    </main>
  );
}
