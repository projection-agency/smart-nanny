"use client";

import { Container } from "@/components/Container";
import s from "./WhySection.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { motion } from "framer-motion";

const dataShort = [
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

const dataLong = [
  {
    id: 1,
    icon: "/icons/why-icons/Vector.svg",
    title: "Перевірені родини",
    desc: "Ми підбираємо лише надійних клієнтів із чіткими умовами, адекватними очікуваннями та безпечною атмосферою в домі",
  },
  {
    id: 2,
    icon: "/icons/why-icons/Vector-1.svg",
    title: "Професійний розвиток ",
    desc: "Надаємо доступ до навчальних матеріалів і методик. Допомагаємо рости в професії  незалежно від того, з чого ви починаєте",
    span: "Поруч із вами щодня",
  },
  {
    id: 3,
    icon: "/icons/why-icons/Vector-2.svg",
    title: "Гнучкий формат",
    desc: "Знайдіть оптимальний графік для себе: повна, часткова зайнятість, разова допомога або робота з проживанням",
  },
  {
    id: 4,
    icon: "/icons/why-icons/Vector-3.svg",
    title: "Справедливі умови й оплата",
    desc: "Ми не беремося за вакансії з низьким чеком. Кожна ваша година оплачується чесно та згідно з домовленостями",
    span: "Гідна праця й заробіток",
  },
  {
    id: 5,
    icon: "/icons/why-icons/Vector-4.svg",
    title: "Постійна підтримка",
    desc: "У нас не працює правило «підлаштовуйся сама». Ви завжди можете звернутися за допомогою, порадою чи підтримкою",
  },
  {
    id: 6,
    icon: "/icons/why-icons/Vector-5.svg",
    title: "Повага до нянь",
    desc: "Працюємо лише з родинами, які цінують вашу працю, дотримуються домовленостей і ставляться з турботою",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const WhySection = () => {
  const pathname = usePathname();

  const isSelectionPage = pathname === "/nanny-selection" ? true : false;

  const data = isSelectionPage ? dataLong : dataShort;

  return (
    <section className={`${s.section} ${isSelectionPage ? s.sectionSelection : ""} `}>
      <Container className={s.content}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.h2 className={s.title} variants={itemVariants}>
            Чому батьки <span>обирають </span>
            сервіс від Smart Nanny?
          </motion.h2>

          {isSelectionPage && (
            <motion.p className={s.desc} variants={itemVariants}>
              Ми будуємо співпрацю на довірі, чітких домовленостях і взаємній
              повазі. Забезпечуємо прозорий процес, чесні умови та завжди
              лишаємося на зв&apos;язку, щоб ви завжди відчували підтримку
            </motion.p>
          )}

          <motion.div variants={itemVariants}>
            <Swiper
              className={s.list}
              breakpoints={{ 1025: { slidesPerView: 4, spaceBetween: 60 } }}
              modules={[Pagination]}
              slidesPerView={1.2}
              pagination={{
                enabled: true,
                type: "bullets",
                el: `.${s.paginationCont}`,
                bulletElement: "p",
              }}
              onSwiper={(swiper) => console.log(swiper)}
            >
              {data.map((item, index) => (
                <SwiperSlide key={item.id + index} className={s.slideCont}>
                  <motion.div
                    className={s.swiperSlide}
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <Image
                      alt={item.title}
                      width={1920}
                      height={1080}
                      src={item.icon}
                      quality={100}
                    />
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <span
                      style={
                        index == 3
                          ? { transform: "rotate(25deg)" }
                          : { transform: "rotate(-10deg)" }
                      }
                    >
                      {item.span}
                    </span>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        </motion.div>
        <div className={s.paginationCont}></div>
      </Container>
    </section>
  );
};
