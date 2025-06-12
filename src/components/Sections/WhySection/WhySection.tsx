"use client";

import { Container } from "@/components/Container";
import s from "./WhySection.module.css";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const dataShort = [
  {
    id: 1,
    icon: "/icons/why-icons/prof.svg",
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
    icon: "/icons/why-icons/support.svg",
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
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const pathname = usePathname();

  const isSelectionPage = pathname === "/nanny-selection" ? true : false;

  const data = isSelectionPage ? dataLong : dataShort;

  return (
    <section
      className={`${s.section} ${isSelectionPage ? s.sectionSelection : ""} `}
    >
      <Container className={s.content}>
        <motion.div
          variants={containerVariants}
          // initial="hidden"
          // animate="show"
        >
          <motion.h2
            className={s.title}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            Чому батьки{" "}
            <span>
              обирають <Line />{" "}
            </span>
            сервіс від Smart Nanny?
          </motion.h2>

          {isSelectionPage && (
            <motion.p
              className={s.desc}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              Ми будуємо співпрацю на довірі, чітких домовленостях і взаємній
              повазі. Забезпечуємо прозорий процес, чесні умови та завжди
              лишаємося на зв&apos;язку, щоб ви завжди відчували підтримку
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {windowWidth <= 1024 ? (
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
            ) : (
              <ul className={s.list}>
                {data.map((item, index) => (
                  <li key={item.id + index} className={s.slideCont}>
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
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </motion.div>
        <div className={s.paginationCont}></div>
      </Container>
    </section>
  );
};

const Line = () => {
  return (
    <motion.svg
      viewBox="0 0 367 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", verticalAlign: "middle" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d="M2.00004 20.7578C2.45188 17.5375 10.2611 15.3919 13.0626 14.56C19.2811 12.7133 24.0145 9.7846 30.74 9.7846C34.8258 9.7846 52.0815 6.52609 43.2852 12.835C41.0185 14.4606 41.0163 13.5523 39.8457 15.3773C38.2423 17.8772 41.1509 16.0385 42.982 15.8346C52.0189 14.8282 59.7991 15.1512 68.9458 14.4606C83.7509 13.3429 100.311 15.5632 114.913 13.1378C125.853 11.3206 137.308 11.4634 148.196 9.78451C155.411 8.67211 162.687 7.24442 170.036 7.24442C172.464 7.24442 178.396 5.9582 178.191 9.07329C178.078 10.7718 172.111 13.0046 170.492 13.6455C168.708 14.352 159.357 17.3032 162.794 17.3032C178.232 17.3032 192.608 14.4284 207.729 11.8166C220.689 9.57803 233.794 5.41555 246.961 5.41555C262.394 5.41555 277.11 3.58668 292.637 3.58668C298.544 3.58668 303.415 1.68424 303.415 7.70164C303.415 9.69628 303.166 11.8532 302.16 13.6455C301.673 14.513 297.455 18.4038 298.282 16.7444C300.841 11.6149 311.575 11.429 316.758 9.78451C324.582 7.30183 333.611 5.67529 341.848 4.50112C349.491 3.41176 357.215 1.75781 365 1.75781"
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
};

export const line = (
  <svg viewBox="0 0 367 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.00004 20.7578C2.45188 17.5375 10.2611 15.3919 13.0626 14.56C19.2811 12.7133 24.0145 9.7846 30.74 9.7846C34.8258 9.7846 52.0815 6.52609 43.2852 12.835C41.0185 14.4606 41.0163 13.5523 39.8457 15.3773C38.2423 17.8772 41.1509 16.0385 42.982 15.8346C52.0189 14.8282 59.7991 15.1512 68.9458 14.4606C83.7509 13.3429 100.311 15.5632 114.913 13.1378C125.853 11.3206 137.308 11.4634 148.196 9.78451C155.411 8.67211 162.687 7.24442 170.036 7.24442C172.464 7.24442 178.396 5.9582 178.191 9.07329C178.078 10.7718 172.111 13.0046 170.492 13.6455C168.708 14.352 159.357 17.3032 162.794 17.3032C178.232 17.3032 192.608 14.4284 207.729 11.8166C220.689 9.57803 233.794 5.41555 246.961 5.41555C262.394 5.41555 277.11 3.58668 292.637 3.58668C298.544 3.58668 303.415 1.68424 303.415 7.70164C303.415 9.69628 303.166 11.8532 302.16 13.6455C301.673 14.513 297.455 18.4038 298.282 16.7444C300.841 11.6149 311.575 11.429 316.758 9.78451C324.582 7.30183 333.611 5.67529 341.848 4.50112C349.491 3.41176 357.215 1.75781 365 1.75781"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
