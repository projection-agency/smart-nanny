"use client";

import React, { useEffect, useState } from "react";
import { Container } from "../Container";
import { BlogItem } from "@/components/BlogItem/BlogItem";
import s from "./BlogPage.module.css";
import { BlogPost } from "../Sections/BlogSection/BlogSection";
import { API_URL } from "@/constants";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export interface Category {
  id: number;
  name: string;
}

export const BlogPage = () => {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>();
  const [categories, setCategories] = useState<Category[]>([]);

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

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}v2/categories`);
        const data = await response.json();
        const filtered = data.filter(
          (cat: Category) => cat.name !== "Без категорії"
        );
        setCategories(filtered);
      } catch (error) {
        console.error("Помилка при отриманні категорій:", error);
      }
    };

    fetchPosts();
    fetchCategories();
  }, []);

  const handleClick = (id: number) => {
    if (id === activeId) {
      setActiveId(null);
      return;
    }

    setActiveId(id);
  };

  // const categories = [];
  // posts.forEach((post) => {});

  return (
    <motion.section
      className={s.section}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <Container>
        <motion.div
          className={s.titleContainer}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2 variants={itemVariants}>
            <span>Щоденник {line}</span>
            від Smart Nanny
            {svg}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            Ми знаходимо нянь, яким можна довірити найцінніше – вашу дитину.
          </motion.p>

          <div className={s.tabController}>
            {categories.map((item) => (
              <motion.div
                onClick={() => handleClick(item.id)}
                className={`${s.tab} ${activeId === item.id && s.active} `}
                key={item.id}
              >
                {item.name}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <ul className={s.list}>
          {posts
            ?.filter((post) =>
              activeId ? post.categories?.includes(activeId) : true
            )
            .map((post) => (
              <BlogItem
                key={post.id}
                info={{
                  title: post.title?.rendered,
                  date: new Date(post.date).toLocaleDateString("uk-UA"),
                  categories: categories
                    .filter((cat) => post.categories?.includes(cat.id))
                    .map((cat) => cat.name),
                  image: post.featured_image_url || "/images/blog/1.jpg",
                  description: post.excerpt?.rendered.replace(/<[^>]+>/g, ""),
                  slug: post.slug,
                }}
              />
            ))}
        </ul>
      </Container>
    </motion.section>
  );
};

const line = (
  <motion.svg
    viewBox="0 0 308 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: "middle" }}
    preserveAspectRatio="xMidYMid meet"
  >
    <motion.path
      d="M2.00004 21C2.37844 17.7797 8.9184 15.6341 11.2646 14.8022C16.4723 12.9555 20.4364 10.0268 26.0687 10.0268C29.4905 10.0268 43.9415 6.76828 36.5749 13.0772C34.6767 14.7028 34.6748 13.7945 33.6944 15.6195C32.3517 18.1193 34.7875 16.2807 36.321 16.0768C43.8891 15.0704 50.4048 15.3934 58.0648 14.7028C70.4635 13.5851 84.3318 15.8054 96.5604 13.38C105.723 11.5628 115.316 11.7056 124.434 10.0267C130.476 8.9143 136.57 7.48661 142.725 7.48661C144.758 7.48661 149.726 6.20039 149.554 9.31548C149.46 11.014 144.462 13.2468 143.107 13.8876C141.612 14.5942 133.781 17.5454 136.66 17.5454C149.589 17.5454 161.627 14.6705 174.291 12.0588C185.145 9.82022 196.12 5.65774 207.147 5.65774C220.071 5.65774 232.395 3.82887 245.399 3.82887C250.346 3.82887 254.424 1.92642 254.424 7.94382C254.424 9.93846 254.216 12.0954 253.374 13.8876C252.966 14.7552 249.433 18.646 250.126 16.9866C252.269 11.8571 261.259 11.6712 265.599 10.0267C272.152 7.54401 279.713 5.91747 286.611 4.7433C293.012 3.65395 299.48 2 306 2"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: false, amount: 0.5 }}
    />
  </motion.svg>
);

const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 73 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M37.2645 27.2955C40.115 27.4948 43.128 26.2379 45.675 25.0087C49.6196 23.105 53.6534 21.7021 57.5486 19.61C62.446 16.9796 66.9069 13.684 71.5095 10.6438"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M41.7623 34.6274C45.4845 34.8877 49.2068 35.148 52.929 35.4083C55.573 35.5932 58.098 35.7387 60.7419 35.4813C61.8636 35.372 62.769 35.7855 63.7784 35.1645"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M4.25 11.9561C10.3867 15.4242 14.559 17.2354 20.4486 21.7878C28.4227 29.8543 32.8622 36.8304 34.5417 46.2696C35.8946 53.8728 36.3099 55.2242 35.8164 62.2806"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M33.9029 18.0387C34.0797 17.0759 35.7332 16.1304 36.4526 15.5119C37.8245 14.3326 38.9778 13.0064 40.3504 11.8265C42.3848 10.0776 44.151 7.82947 45.9007 5.79019C46.4753 5.12045 47.11 4.31346 47.9176 3.98203"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
