import BlogPageItem, { BlogPost } from "@/components/BlogPageItem/BlogPageItem";
import { API_URL } from "@/constants";

export async function generateStaticParams() {
  const locales = ['ua', 'en'];
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    const res = await fetch(`${API_URL}v2/posts?lang=${locale}`);
    const posts: BlogPost[] = await res.json();
    params.push(...posts.map((post) => ({ locale, slug: post.slug })));
  }

  return params;
}

export default function BlogPage() {
  return <BlogPageItem />;
}
