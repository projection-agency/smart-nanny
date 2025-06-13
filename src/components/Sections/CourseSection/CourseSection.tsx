"use client";
import { Container } from "@/components/Container";
import s from "./CourseSection.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 51 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5332 28.1898C21.1423 26.1633 19.7048 24.2942 18.3734 22.7451C16.3112 20.3461 14.5821 17.7917 12.3977 15.4622C9.65124 12.5332 6.52172 10.0326 3.54407 7.38576"
      stroke="#FFF9C1"
      strokeWidth="2.1668"
      strokeLinecap="round"
    />
    <path
      d="M25.8147 23.6894C25.3042 21.0431 24.7937 18.3969 24.2833 15.7507C23.9207 13.871 23.5528 12.0817 22.8815 10.2843C22.5967 9.52182 22.7169 8.81302 22.0958 8.22397"
      stroke="#FFF9C1"
      strokeWidth="2.1668"
      strokeLinecap="round"
    />
    <path
      d="M16.9688 54.084C18.2481 49.1562 18.7364 45.9075 20.8185 40.9505C24.9656 33.8854 29.0089 29.4898 35.2844 26.5625C40.3393 24.2045 41.2052 23.6634 46.2218 22.6957"
      stroke="#FFF9C1"
      strokeWidth="2.1668"
      strokeLinecap="round"
    />
    <path
      d="M15.7004 32.2585C14.9955 32.3141 14.0282 31.3359 13.4628 30.9488C12.3846 30.2106 11.2446 29.6523 10.1659 28.9138C8.56702 27.8191 6.66961 27.0044 4.92102 26.1625C4.34675 25.8859 3.66553 25.5931 3.28405 25.0911"
      stroke="#FFF9C1"
      strokeWidth="2.1668"
      strokeLinecap="round"
    />
  </svg>
);

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const CourseSection = () => {
  return (
    <section className={s.section}>
      <Image
        alt="Worm"
        width={1920}
        height={1080}
        priority
        src="/icons/yellow-worm.svg"
        className={s.worm}
      />
      <Container>
        <motion.h2
          className={s.title}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.9 }}
          variants={itemVariants}
        >
          {svg}
          Цей курс
          <span> для вас {line} </span>
          якщо ви...
        </motion.h2>

        <ul className={s.list}>
          {cardsData.map((item, index) => (
            <motion.li
              key={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.5 }}
              variants={itemVariants}
            >
              <svg>
                <use xlinkHref={item.icon}></use>
              </svg>

              <h4>{item.title}</h4>

              <p>{item.description}</p>

              <Image
                alt="Border"
                width={1920}
                height={1080}
                priority
                src="/images/border-image.png"
                className={s.border}
              />
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

const cardsData = [
  {
    title: "Мрієте стати нянею",
    description:
      "Отримаєте повну базу знань, навичок і впевненості для старту в професії",
    icon: "/icons/course-icons.svg#icon-1",
  },
  {
    title: "Хочете вийти на новий рівень",
    description:
      "Поглибите свої знання та отримаєте більше впевненості у роботі",
    icon: "/icons/course-icons.svg#icon-2",
  },
  {
    title: "Є основа - варто структурувати",
    description:
      "Систематизуєте свої знання та отримаєте нові інструменти для роботи",
    icon: "/icons/course-icons.svg#icon-3",
  },
  {
    title: "Прагнете нових методик",
    description: "Оновіть підходи та додавайте більше цікавого в заняття",
    icon: "/icons/course-icons.svg#icon-4",
  },
];

const line = (
  <motion.svg
    viewBox="0 0 166 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ width: "100%", height: "auto", verticalAlign: "middle" }}
    preserveAspectRatio="xMidYMid meet"
  >
    <motion.path
      d="M1.5 9.90499C1.66487 8.05717 4.51428 6.82604 5.53649 6.34866C7.80547 5.28904 9.53257 3.60854 11.9865 3.60854C13.4774 3.60854 19.7736 1.7388 16.564 5.35886C15.737 6.29166 15.7361 5.77047 15.309 6.81767C14.724 8.25207 15.7852 7.19703 16.4534 7.08002C19.7508 6.50257 22.5896 6.68791 25.927 6.29166C31.329 5.65028 37.3713 6.92431 42.6993 5.53263C46.6912 4.48993 50.8708 4.57185 54.8437 3.60849C57.476 2.97019 60.131 2.15098 62.8126 2.15098C63.6984 2.15098 65.863 1.41295 65.788 3.20039C65.747 4.17499 63.5696 5.4562 62.9791 5.82391C62.328 6.22932 58.916 7.92273 60.1702 7.92273C65.8032 7.92273 71.0485 6.27314 76.5658 4.7745C81.2947 3.49001 86.0766 4.54438 90.8808 4.54438C96.5121 4.54438 101.881 5.21638 107.547 5.21638C109.702 5.21638 111.479 4.12475 111.479 7.57755C111.479 8.65616 111.399 9.8175 111.082 10.8084M111.082 10.8084C111.063 10.869 111.043 10.9289 111.022 10.9881C110.844 11.4859 109.305 13.7185 109.607 12.7663C109.882 11.8984 110.417 11.2772 111.082 10.8084ZM111.082 10.8084C112.674 9.68732 115.015 9.43808 116.348 8.77271C119.203 7.34814 122.497 6.41483 125.503 5.74108C128.292 5.11601 131.11 4.16697 133.95 4.16697L139.42 4.36445C139.831 4.36445 141.96 4.05179 141.96 4.73888C141.96 5.76298 141.305 6.89213 140.849 7.60955C139.808 9.2466 138.484 10.5981 137.207 11.7283C136.793 12.0938 136.42 12.3932 137.162 12.0473C138.785 11.2914 140.633 11.33 142.312 10.8547C144.351 10.2775 146.259 9.57045 148.186 8.33069C149.774 7.30906 151.429 6.33105 153.106 5.73738C155.444 4.91043 158.022 5.11332 160.408 5.11332C161.745 5.11332 163.194 5.37711 164.5 4.8637"
      stroke="#FFF9C1"
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
