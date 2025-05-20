import Link from "next/link";
import s from "./BlogItem.module.css";
import Image from "next/image";

export const BlogItem = ({
  info,
}: {
  info: {
    title: string;
    date: string;
    category: string;
    image: string;
    description: string;
    slug?: string;
  };
}) => {
  return (
    <Link href={`/blog/${info.slug}`} className={s.item}>
      <div className={s.imageContainer}>
        <Image width={1920} height={1080} alt="" src={info.image} />
      </div>

      <div className={s.content}>
        <div>
          <span>{info.date}</span>
          <div></div>
          <span>{info.category}</span>
        </div>

        <h4>{info.title}</h4>

        <p>{info.description}</p>
      </div>
    </Link>
  );
};
