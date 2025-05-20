import s from "./article.module.css";
import Image from "next/image";
import { Container } from "@/components/Container";
import { BlogItem } from "@/components/BlogItem/BlogItem";
import { storiesData } from "@/data/storiesData";

export default async function Blog({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = storiesData.find((p) => p.slug === slug);

  if (!post) return <div>Статтю не знайдено</div>;

  return (
    <main>
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.titleContainer}>
            <div>
              <span>03.03.2025</span>
              <div></div>
              <span>Навчання та поради</span>
            </div>

            <h1>
              Як Катерина влаштувала дітям творчий вечір, який вони запам’ятають
              надовго
            </h1>

            <p>
              Фарби, сміх, солодощі та море натхнення — як одна няня може
              перетворити звичайний день на маленьке свято
            </p>
          </div>

          <div className={s.imageContainer}>
            <Image
              width={1920}
              height={1080}
              src="/images/blog/1.jpg"
              alt="Image"
            />
          </div>

          <div className={s.textContainer}>
            <p>
              Щасливе дитинство — це не лише про безпеку та режим. Це про ті
              моменти, які залишаються в пам’яті на все життя. І саме такі
              моменти створює наша чудова няня Катерина.
            </p>
            <p>
              На днях вона організувала для діток справжній творчий вечір, який
              став і святом, і майстер-класом, і живим прикладом турботи з
              душею.
            </p>
            <p>
              У кімнаті панувала атмосфера натхнення: фарби, аплікації,
              кольоровий папір, ігри на уяву та командну роботу — усе для того,
              щоб кожна дитина могла вільно творити, вигадувати, пробувати нове.
              Діти створювали свої маленькі шедеври, обмінювалися ідеями,
              вчилися слухати одне одного й ділитися матеріалами — хтось клеїв,
              хтось малював, хтось допомагав іншому.
            </p>
          </div>
        </div>
      </section>

      <section className={s.otherArticles}>
        <Container>
          <h2>Читати далі</h2>

          <ul className={s.list}>
            {storiesData.slice(0, 4).map((item, index) => (
              <BlogItem key={index} info={item} />
            ))}
          </ul>
        </Container>
      </section>
    </main>
  );
}
