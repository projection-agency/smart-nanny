"use client";

import { Container } from "@/components/Container";
import s from "./RoadSection.module.css";
import { btnSvg } from "@/components/BtnSvg";
import { useModal } from "@/components/ModalContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css/pagination";
import Image from "next/image";
import { motion, easeOut } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import i18n from "@/i18n/client";
import { useEffect, useState } from "react";
import { AnimatedLine } from "@/components/AnimatedLine/AnimatedLine";

// Додаю анімаційні об'єкти для Framer Motion
const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.7,
      ease: easeOut,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: easeOut,
    },
  },
};

export const RoadSection = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const { openModal } = useModal();
  const { t } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const stepsRaw = !isReady
    ? (translation && (translation["road_steps"] as unknown[])) || []
    : t("road_steps", { returnObjects: true }) || [];
  const steps = Array.isArray(stepsRaw) ? stepsRaw : [];

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  useEffect(() => {
    setIsClient(true);
  }, []);

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
            {!isReady ? (
              (translation && (translation["road_title"] as string)) || ""
            ) : (
              <Trans
                i18nKey="road_title"
                components={{
                  span: <span />,
                  line: <AnimatedLine stroke={"#FF91B2"} />,
                }}
              />
            )}
          </motion.h2>

          <motion.p
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, amount: 0.5 }}
            variants={itemVariants}
          >
            {t("road_subtitle")}
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

        {isClient && (
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
            {steps.map((step, index) => (
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

                  <h4>{t("road_requirements")}</h4>

                  <ul className={s.requirementsMobile}>
                    {step.needed.map((item: string, idx: number) => (
                      <li key={idx}>
                        {item}
                        {underline}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        <div className={s.paginationCont}></div>

        <motion.ul
          className={s.stepList}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {steps.map((step, index) => (
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

              <h4>{t("road_requirements")}</h4>

              <ul>
                {step.needed.map((item: string, idx: number) => (
                  <li key={idx}>
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
          {t("road_btn")}
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
