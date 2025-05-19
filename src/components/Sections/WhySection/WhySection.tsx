import { Container } from "@/components/Container";
import s from "./WhySection.module.css";
import Image from "next/image";

const data = [
  {
    id: 1,
    icon: "/icons/why-icons/prof.png",
    title: "Професіоналізм",
    desc: "Наші няні постійно вдосконалюють навички завдяки навчанню з першої домедичної допомоги, розвитку та догляду за дітьми",
  },
  {
    id: 2,
    icon: "/icons/why-icons/fast.svg",
    title: "Швидкий підбір",
    desc: "Маємо велику команду перевірених нянь, тож пропонуємо варіанти за 1–5 днів, гарантуючи своєчасну підтримку родин",
    span: "Швидкий старт співпраці",
  },
  {
    id: 3,
    icon: "/icons/why-icons/verified.svg",
    title: "Перевірені няні",
    desc: "Кожен кандидат проходить перевірку документів, досвіду, рекомендацій і співбесіду  для вашого спокою та безпеки.",
  },
  {
    id: 4,
    icon: "/icons/why-icons/support.png",
    title: "Підтримка родини",
    desc: "Ми допомагаємо налагодити комфортну та довготривалу співпрацю, щоб ви почувалися впевнено щодня.",
    span: "Поруч із вами щодня",
  },
];

export const WhySection = () => {
  return (
    <section className={s.section}>
      <Container>
        <h2 className={s.title}>
          Чому батьки <span>обирають </span>
          сервіс від Smart Nanny <p>?</p>
        </h2>

        <ul className={s.list}>
          {data.map((item, index) => (
            <li key={item.id + index}>
              <Image
                alt={item.title}
                width={1920}
                height={1080}
                src={item.icon}
                quality={100}
              />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
              <span>{item.span}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
