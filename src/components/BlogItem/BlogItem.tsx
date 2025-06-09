import Link from "next/link";
import s from "./BlogItem.module.css";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export const BlogItem = ({
  info,
}: {
  info: {
    title: string;
    date: string;
    categories: string[];
    image: string;
    description: string;
    slug?: string;
  };
}) => {
  return (
    <motion.div
      className={s.itemBlock}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <Link href={`/blog/${info.slug}`} className={s.item}>
        <div className={s.imageContainer}>
          <Image
            width={1920}
            height={1080}
            alt={info.categories?.join(", ") || "Категорія"}
            src={info.image}
          />
        </div>

        <div className={s.content}>
          <div>
            <span>{info.date}</span>
            {info.categories && info.categories.length > 0 && (
              <>
                <div></div>
                {info.categories.map((cat, idx) => (
                  <React.Fragment key={cat}>
                    <span>{cat}</span>
                    {idx < info.categories.length - 1 && <div></div>}
                  </React.Fragment>
                ))}
              </>
            )}
          </div>

          <h4>{info.title}</h4>

          <p>{info.description}</p>
        </div>
      </Link>
    </motion.div>
  );
};
