"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import s from "./article.module.css";
import Image from "next/image";
import { API_URL } from "@/constants";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@/components/Breadcrumbs/Breadcrumbs";
import { useTranslation } from "react-i18next";
import Spinner from "@/components/Spinner";
import { BlogItem } from "@/components/BlogItem/BlogItem";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

export type BlogPost = {
  id: number;
  slug: string;
  title: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_image_url?: string;
  categories: number[];
  _embedded?: {
    "wp:featuredmedia": { source_url: string }[];
  };
};

type Category = {
  id: number;
  name: string;
};

export default function BlogPage() {
  const { slug, locale } = useParams<{ slug: string; locale: string }>();
  const { t, i18n } = useTranslation("common");
  const [posts, setPosts] = useState<BlogPost[]>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    if (!slug || !locale) return;
    const lang = locale === "ua" ? "ua" : locale;
    const fetchPost = async () => {
      try {
        const res = await fetch(
          `${API_URL}v2/posts?slug=${slug}&_embed=1&lang=${lang}`
        );
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
  }, [slug, locale]);

  useEffect(() => {
    const lang = i18n.language === "ua" ? "ua" : i18n.language;
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}v2/posts?lang=${lang}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Помилка при отриманні FAQ:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}v2/categories?lang=${lang}`);
        const data = await response.json();
        setCategories(
          data.filter(
            (cat: Category) =>
              cat.name !== (lang === "ua" ? "Без категорії" : "Без категорії")
          )
        );
      } catch (error) {
        console.error("Помилка при отриманні категорій:", error);
      }
    };

    fetchPosts();
    fetchCategories();
  }, [i18n.language]);

  useEffect(() => {
    if (!locale) return;
    const lang = locale === "ua" ? "ua" : locale;
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}v2/categories?lang=${lang}`);
        const data = await response.json();
        setCategories(
          data.filter((cat: Category) => cat.name !== "Без категорії")
        );
      } catch (error) {
        console.error("Помилка при отриманні категорій:", error);
      }
    };
    fetchCategories();
  }, [locale]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  if (loading) {
    return <Spinner />;
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

  const postCategoryNames =
    post?.categories && categories.length
      ? categories
          .filter((cat) => post.categories.includes(cat.id))
          .map((cat) => cat.name)
      : [];

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t("breadcrumbs_home"), href: `/${locale}` },
    { label: t("breadcrumbs_blog"), href: `/${locale}/blog` },
    {
      label:
        post.title.rendered.length > 40
          ? post.title.rendered.slice(0, 40) + "..."
          : post.title.rendered,
      active: true,
    },
  ];

  const getCategoryNames = (post: BlogPost) => {
    if (!post.categories || !categories.length) return [];
    return categories
      .filter((cat) => post.categories.includes(cat.id))
      .map((cat) => cat.name);
  };

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} />
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.titleContainer}>
            <div>
              <span>{formattedDate}</span>
              {postCategoryNames.length > 0 && (
                <>
                  <div></div>
                  {postCategoryNames.map((cat, idx) => (
                    <span key={cat}>
                      {cat}
                      {idx < postCategoryNames.length - 1 && (
                        <div
                          style={{
                            display: "inline-block",
                            width: "0.2vw",
                            height: "0.2vw",
                            background: "rgba(0,0,0,0.4)",
                            borderRadius: "50%",
                            margin: "0 0.3vw",
                          }}
                        ></div>
                      )}
                    </span>
                  ))}
                </>
              )}
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

        <div className={s.viewMoreCont}>
          <h2>{t("blog_page_view_more_section_title")}</h2>
          {windowWidth <= 1024 ? (
            <>
              <Swiper
                modules={[Pagination]}
                pagination={{
                  type: "bullets",
                  el: `.${s.paginationCont}`,
                  bulletElement: "p",
                }}
                className={`${s.swiper} swiper`}
              >
                {posts?.slice(0, 4).map((post: BlogPost) => (
                  <SwiperSlide key={post.id} className={s.swiperSlide}>
                    <BlogItem
                      info={{
                        title: post.title?.rendered,
                        date: new Date(post.date).toLocaleDateString("uk-UA"),
                        categories: getCategoryNames(post),
                        image: post.featured_image_url || "/images/blog/1.jpg",
                        description: post.excerpt?.rendered.replace(
                          /<[^>]+>/g,
                          ""
                        ),
                        slug: post.slug,
                      }}
                      locale={locale}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className={s.paginationCont}></div>
            </>
          ) : (
            <ul className={s.viewMoreList}>
              {posts?.slice(0, 4).map((post: BlogPost) => (
                <BlogItem
                  key={post.id}
                  info={{
                    title: post.title?.rendered,
                    date: new Date(post.date).toLocaleDateString("uk-UA"),
                    categories: getCategoryNames(post),
                    image: post.featured_image_url || "/images/blog/1.jpg",
                    description: post.excerpt?.rendered.replace(/<[^>]+>/g, ""),
                    slug: post.slug,
                  }}
                  locale={locale}
                />
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  );
}
