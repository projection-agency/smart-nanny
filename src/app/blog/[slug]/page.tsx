// import s from "./article.module.css";
// import Image from "next/image";
// import { API_URL } from "@/constants";
// import { notFound } from "next/navigation";

// export type BlogPost = {
//   id: number;
//   slug: string;
//   title: { rendered: string };
//   date: string;
//   excerpt: { rendered: string };
//   content: { rendered: string };
//   _embedded?: {
//     "wp:featuredmedia": { source_url: string }[];
//   };
// };

// export default async function BlogPage(props: { params: { slug: string } }) {
//   const slug = decodeURIComponent(props.params.slug);
//   const res = await fetch(`${API_URL}v2/posts?slug=${slug}&_embed=1`, {
//     next: { revalidate: 60 },
//   });

//   const data: BlogPost[] = await res.json();
//   const post = data[0];

//   if (!post) return notFound();

//   const image =
//     post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
//     "/images/program-item-video.jpg";

//   const formattedDate = new Date(post.date).toLocaleDateString("uk-UA", {
//     day: "2-digit",
//     month: "2-digit",
//     year: "numeric",
//   });

//   return (
//     <main>
//       <section className={s.section}>
//         <div className={s.container}>
//           <div className={s.titleContainer}>
//             <div>
//               <span>{formattedDate}</span>
//               <div></div>
//               <span>Навчання та поради</span>
//             </div>

//             <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
//             <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
//           </div>

//           <div className={s.imageContainer}>
//             <Image
//               width={1920}
//               height={1080}
//               src={image}
//               alt={post.title.rendered}
//             />
//           </div>

//           <div
//             className={s.textContainer}
//             dangerouslySetInnerHTML={{ __html: post.content.rendered }}
//           />
//         </div>
//       </section>
//     </main>
//   );
// }

export default function Article() {
  return (
    <main>
      <p>S</p>
    </main>
  );
}
