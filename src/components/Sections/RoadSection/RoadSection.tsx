"use client";

import { Container } from "@/components/Container";
import s from "./RoadSection.module.css";
import { btnSvg } from "../BlogSection/BlogSection";
import { useModal } from "@/components/ModalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Image from "next/image";
import { motion } from "framer-motion";

export const selectionSteps = [
  {
    step: "Етап 1",
    title: "Ретельний відбір кандидатів",
    description:
      "На цьому етапі проводимо фільтрування кандидитатів під час співбесіди з HR на основі їхньої мотивації, готовності працювати з дітьми та відповідності цінностей родині. ",
    needed: [
      "Паспорт",
      "ІПН",
      "Документ про освіту",
      "Медична довідка про придатність",
      "Рекомендації",
    ],
  },
  {
    step: "Етап 2",
    title: "Оцінка знань",
    description:
      "Кандидати проходять тестування знань з догляду, безпеки та розвитку дітей. Це підтверджує, що вони не лише люблять дітей, а й мають відповідні знання.",
    needed: [
      "Оцінка знань із безпеки та догляду",
      "Тренінг з домедичної допомоги",
      "Курс з педагогіки",
      "Знання з догляду та розвитку",
      "Знання з домедичної допомоги",
    ],
  },
  {
    step: "Етап 3",
    title: "Навчання та підготовка",
    description:
      "Кандидати проходять тренінг з домедичної допомоги та професійний курс 'Професійна няня', де отримують практичні знання для роботи з дітьми.",
    needed: [
      "Тест із безпеки та догляду",
      "Тренінг з домедичної допомоги",
      "Курс Професійна няня",
      "Курс з педагогіки",
    ],
  },
  {
    step: "Етап 4",
    title: "Фінальний відбір",
    description:
      "Супроводжуємо няню на всіх етапах роботи: консультуємо, допомагаємо з питаннями та запрошуємо до комʼюніті однодумців, де завжди можна знайти підтримку й натхнення.",
    needed: [
      "Обговорення",
      "Підтримка та натхнення від команди",
      "Ком`юніті однодумців",
    ],
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
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
};

const lineVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
};

export const RoadSection = () => {
  const { openModal } = useModal();

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <div className={s.titleContainer}>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.9 }}
            variants={itemVariants}
          >
            Як ми відбираємо та{" "}
            <span>
              готуємо спеціалістів{" "}
              {
                <motion.svg
                  viewBox="0 0 457 23"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    width: "100%",
                    height: "auto",
                    verticalAlign: "middle",
                  }}
                  preserveAspectRatio="xMidYMid meet"
                >
                  <motion.path
                    d="M1.5 15.7765C1.9592 12.5562 9.8956 10.4106 12.7427 9.57868C19.0625 7.73202 23.8729 4.8033 30.7079 4.8033C34.8603 4.8033 52.397 1.5448 43.4574 7.85368C41.1539 9.47934 41.1516 8.57104 39.9619 10.396C38.3324 12.8959 41.2884 11.0572 43.1493 10.8533C52.3334 9.8469 60.2403 10.1699 69.5359 9.47935C84.5821 8.36157 101.412 10.5819 116.251 8.15653C127.37 6.33934 139.011 6.48211 150.077 4.80322C157.409 3.69081 164.804 2.26312 172.273 2.26312C174.74 2.26312 180.769 0.976907 180.56 4.09199C180.446 5.79049 174.381 8.02334 172.736 8.66416C170.923 9.3707 161.419 12.3219 164.913 12.3219C180.602 12.3219 195.212 9.44706 210.579 6.83529C223.75 4.59673 237.069 6.43425 250.45 6.43425C266.135 6.43425 281.09 7.60538 296.87 7.60538C302.873 7.60538 311.146 6.70396 307.823 11.7203C303 19 318 14.8597 321.384 13.8032C329.335 11.3205 338.511 9.69399 346.883 8.51982C354.649 7.43046 362.5 5.77651 370.411 5.77651L385.645 6.12067C386.791 6.12067 392.719 5.57579 392.719 6.77322C392.719 8.55798 390.895 10.5258 389.624 11.7761C386.725 14.6291 383.039 16.9845 379.48 18.9542C378.329 19.5911 377.29 20.1129 379.357 19.5101C383.876 18.1926 389.025 18.2599 393.702 17.4316C399.38 16.4258 404.693 15.1935 410.06 13.0329C414.483 11.2524 419.092 9.54799 423.766 8.51336C430.275 7.07219 437.456 7.42577 444.103 7.42577C447.826 7.42577 451.863 7.8855 455.5 6.99074"
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
              }
            </span>
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            variants={itemVariants}
          >
            Ми знаходимо нянь, яким можна довірити найцінніше – вашу дитину.
          </motion.p>
          <Image
            alt="Plate"
            width={1920}
            height={1080}
            priority
            src="/icons/plate.svg"
            className={s.plate}
          />
        </div>

        <Swiper
          className={s.stepListMobile}
          modules={[Pagination]}
          slidesPerView={1.1}
          spaceBetween={20}
          pagination={{
            enabled: true,
            type: "bullets",
            el: `.${s.paginationCont}`,
            bulletElement: "p",
          }}
        >
          {selectionSteps.map((step, index) => (
            <SwiperSlide key={index} className={s.slideCont}>
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: false, amount: 0.3 }}
              >
                <span className={s.step}>
                  <span>{step.step}: </span> {stepBg}
                </span>

                <h3>{step.title}</h3>
                <p>{step.description}</p>

                <h4>Що потрібно:</h4>

                <ul className={s.requirementsMobile}>
                  {step.needed.map((item, index) => (
                    <li key={index}>
                      {item}
                      {underline}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={s.paginationCont}></div>

        <motion.ul
          className={s.stepList}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {selectionSteps.map((step, index) => (
            <motion.li
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              <span className={s.step}>
                <span>{step.step}: </span> {stepBg}
              </span>

              <h3>{step.title}</h3>
              <p>{step.description}</p>

              <h4>Що потрібно:</h4>

              <ul>
                {step.needed.map((item, index) => (
                  <li key={index}>
                    {item}
                    {underline}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          onClick={() => openModal("formA")}
          className={s.btn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          variants={itemVariants}
        >
          <div className={s.first}>{btnSvg}</div>
          Підібрати няню
          <div className={s.second}>{btnSvg}</div>
        </motion.button>
      </Container>
    </section>
  );
};

const stepBg = (
  <svg
    width="126"
    height="48"
    viewBox="0 0 126 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M105.056 45.1743C58.9332 47.049 33.6575 46.303 12.8319 36.8542C0.145139 31.098 -12.457 3.10223 44.0462 2.22396C67.9891 1.85179 85.9821 1.80104 99.8101 3.20899C128.277 6.10747 133.613 44.0135 105.056 45.1743Z"
      fill="#ACE2FF"
      stroke="#ACE2FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const underline = (
  <svg viewBox="0 0 151 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M148.23 1.26846H149.889C150.442 1.26846 148.783 1.26219 148.23 1.26846Z"
      fill="#FF91B2"
    />
    <path
      d="M1 3.29047C50.979 -0.0861886 82.8937 1.26846 133.226 1.26846C138.143 1.26846 143.06 1.26846 147.977 1.26846C148.614 1.26846 149.252 1.26846 149.889 1.26846C150.442 1.26846 148.783 1.26219 148.23 1.26846C142.66 1.3317 134.11 1.59304 128.56 1.84639C62.095 4.88025 106.257 2.76562 39.0052 4.49689"
      stroke="#FF91B2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

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
