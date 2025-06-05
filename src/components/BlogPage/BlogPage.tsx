"use client";

import React, { useEffect } from "react";
import { Container } from "../Container";
import { useState } from "react";
import { BlogItem } from "@/components/BlogItem/BlogItem";
import s from "./BlogPage.module.css";
import { BlogPost } from "../Sections/BlogSection/BlogSection";
import { API_URL } from "@/constants";

const categories = [
  {
    id: 1,
    title: "Життя сервісу",
  },
  {
    id: 2,
    title: "Навчання та поради",
  },
  {
    id: 3,
    title: "Новини для батьків",
  },
  {
    id: 4,
    title: "Оголошення",
  },
];

export const BlogPage = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  const [posts, setPosts] = useState<BlogPost[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${API_URL}v2/posts`);

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Помилка при отриманні FAQ:", error);
      }
    };

    fetchPosts();
  }, []);

  console.log(posts);

  const handleClick = (id: number) => {
    if (id === activeId) {
      setActiveId(null);
      return;
    }

    setActiveId(id);
  };

  console.log(posts);

  // const categories = [];
  // posts.forEach((post) => {});

  return (
    <section className={s.section}>
      <Container>
        <div className={s.titleContainer}>
          <h2>
            <span>Щоденник {line}</span>
            від Smart Nanny
          </h2>

          <p>
            Ми знаходимо нянь, яким можна довірити найцінніше – вашу дитину.
          </p>

          <div className={s.tabController}>
            {categories.map((item) => (
              <div
                onClick={() => handleClick(item.id)}
                className={`${s.tab} ${activeId === item.id && s.active} `}
                key={item.id}
              >
                {item.title}
              </div>
            ))}
          </div>
        </div>

        <ul className={s.list}>
          {posts?.map((post) => (
            <BlogItem
              key={post.id}
              info={{
                title: post.title?.rendered,
                date: new Date(post.date).toLocaleDateString("uk-UA"),
                category: "Новини",
                image: post.featured_image_url || "/images/blog/1.jpg",
                description: post.excerpt?.rendered.replace(/<[^>]+>/g, ""),
                slug: post.slug,
              }}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
};

const line = (
  <svg viewBox="0 0 308 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.00004 21C2.37844 17.7797 8.9184 15.6341 11.2646 14.8022C16.4723 12.9555 20.4364 10.0268 26.0687 10.0268C29.4905 10.0268 43.9415 6.76828 36.5749 13.0772C34.6767 14.7028 34.6748 13.7945 33.6944 15.6195C32.3517 18.1193 34.7875 16.2807 36.321 16.0768C43.8891 15.0704 50.4048 15.3934 58.0648 14.7028C70.4635 13.5851 84.3318 15.8054 96.5604 13.38C105.723 11.5628 115.316 11.7056 124.434 10.0267C130.476 8.9143 136.57 7.48661 142.725 7.48661C144.758 7.48661 149.726 6.20039 149.554 9.31548C149.46 11.014 144.462 13.2468 143.107 13.8876C141.612 14.5942 133.781 17.5454 136.66 17.5454C149.589 17.5454 161.627 14.6705 174.291 12.0588C185.145 9.82022 196.12 5.65774 207.147 5.65774C220.071 5.65774 232.395 3.82887 245.399 3.82887C250.346 3.82887 254.424 1.92642 254.424 7.94382C254.424 9.93846 254.216 12.0954 253.374 13.8876C252.966 14.7552 249.433 18.646 250.126 16.9866C252.269 11.8571 261.259 11.6712 265.599 10.0267C272.152 7.54401 279.713 5.91747 286.611 4.7433C293.012 3.65395 299.48 2 306 2"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
