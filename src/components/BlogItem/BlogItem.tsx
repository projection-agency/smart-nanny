import Link from "next/link";
import s from "./BlogItem.module.css";
import Image from "next/image";
import React from "react";

export const BlogItem = ({
  info,
  locale
}: {
  info: {
    title: string;
    date: string;
    categories: string[];
    image: string;
    description: string;
    slug?: string;
  };
  locale: string;
}) => {
  return (
    <div
      className={s.itemBlock}
    >
      <Link href={`/${locale}/blog/${info.slug}`} className={s.item}>
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
    </div>
  );
};
