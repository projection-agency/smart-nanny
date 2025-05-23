import { BlogPage } from "@/components/BlogPage/BlogPage";

export const metadata = {
  title: "Блог",
  description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
};

export default function Blog() {
  return (
    <main>
      <BlogPage />
    </main>
  );
}
