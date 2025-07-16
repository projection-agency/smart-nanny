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
import { useTranslation, Trans } from "react-i18next";
import i18n from "@/i18n/client";
import type { Variants } from "framer-motion";
import { AnimatedLine } from "@/components/AnimatedLine/AnimatedLine";

const iconsShort = [
  "/icons/why-icons/prof.svg",
  "/icons/why-icons/fast.svg",
  "/icons/why-icons/verified.svg",
  "/icons/why-icons/support.svg",
];

const iconsLong = [
  "/icons/why-icons/Vector.svg",
  "/icons/why-icons/Vector-1.svg",
  "/icons/why-icons/Vector-2.svg",
  "/icons/why-icons/Vector-3.svg",
  "/icons/why-icons/Vector-4.svg",
  "/icons/why-icons/Vector-5.svg",
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const WhySection = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const { t } = useTranslation("common");
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const isNannyPage = pathname === `/${locale}/nanny-selection`;
  const titleKey = isNannyPage ? "nanny-selection-why-title" : "why_title";

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const isSelectionPage =
    pathname === `/${locale}/nanny-selection` ? true : false;
  const rawData = t(isSelectionPage ? "why_long" : "why_short", {
    returnObjects: true,
  });
  const data = Array.isArray(rawData) ? rawData : [];
  const icons = isSelectionPage ? iconsLong : iconsShort;

  return (
    <section
      className={`${s.section} ${isSelectionPage ? s.sectionSelection : ""} `}
    >
      <Container className={s.content}>
        <motion.div variants={containerVariants}>
          <motion.h2
            className={s.title}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {!isReady ? (
              (translation && (translation[titleKey] as string)) || ""
            ) : (
              <Trans
                i18nKey={titleKey}
                components={{
                  span: <span />,
                  line: <AnimatedLine stroke="#FF91B2" />,
                }}
              />
            )}
          </motion.h2>

          {isSelectionPage && (
            <motion.p
              className={s.desc}
              variants={itemVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              {t("why_desc_selection")}
            </motion.p>
          )}

          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {isClient && windowWidth <= 1024 ? (
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
                  <SwiperSlide key={index} className={s.slideCont}>
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
                        src={icons[index]}
                        quality={100}
                      />
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      {item.span && (
                        <span
                          style={
                            index == 3
                              ? { transform: "rotate(25deg)" }
                              : { transform: "rotate(-10deg)" }
                          }
                        >
                          {item.span}
                        </span>
                      )}
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : null}
            {isClient && windowWidth > 1024 ? (
              <ul className={s.list}>
                {data.map((item, index) => (
                  <li key={index} className={s.slideCont}>
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
                        src={icons[index]}
                        quality={100}
                      />
                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                      {item.span && (
                        <span
                          style={
                            index == 3
                              ? { transform: "rotate(25deg)" }
                              : { transform: "rotate(-10deg)" }
                          }
                        >
                          {item.span}
                        </span>
                      )}
                    </motion.div>
                  </li>
                ))}
              </ul>
            ) : null}
          </motion.div>
        </motion.div>
        <div className={s.paginationCont}></div>
      </Container>
    </section>
  );
};

// const Line = () => {
//   return (
//     <motion.svg
//       viewBox="0 0 367 23"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ width: "100%", height: "auto", verticalAlign: "middle" }}
//       preserveAspectRatio="xMidYMid meet"
//     >
//       <motion.path
//         d="M2.00004 20.7578C2.45188 17.5375 10.2611 15.3919 13.0626 14.56C19.2811 12.7133 24.0145 9.7846 30.74 9.7846C34.8258 9.7846 52.0815 6.52609 43.2852 12.835C41.0185 14.4606 41.0163 13.5523 39.8457 15.3773C38.2423 17.8772 41.1509 16.0385 42.982 15.8346C52.0189 14.8282 59.7991 15.1512 68.9458 14.4606C83.7509 13.3429 100.311 15.5632 114.913 13.1378C125.853 11.3206 137.308 11.4634 148.196 9.78451C155.411 8.67211 162.687 7.24442 170.036 7.24442C172.464 7.24442 178.396 5.9582 178.191 9.07329C178.078 10.7718 172.111 13.0046 170.492 13.6455C168.708 14.352 159.357 17.3032 162.794 17.3032C178.232 17.3032 192.608 14.4284 207.729 11.8166C220.689 9.57803 233.794 5.41555 246.961 5.41555C262.394 5.41555 277.11 3.58668 292.637 3.58668C298.544 3.58668 303.415 1.68424 303.415 7.70164C303.415 9.69628 303.166 11.8532 302.16 13.6455C301.673 14.513 297.455 18.4038 298.282 16.7444C300.841 11.6149 311.575 11.429 316.758 9.78451C324.582 7.30183 333.611 5.67529 341.848 4.50112C349.491 3.41176 357.215 1.75781 365 1.75781"
//         stroke="#FF91B2"
//         strokeWidth="3"
//         strokeLinecap="round"
//         pathLength={1}
//         initial={{ pathLength: 0 }}
//         whileInView={{ pathLength: 1 }}
//         transition={{ duration: 1.2, ease: "easeOut" }}
//         viewport={{ once: false, amount: 0.5 }}
//       />
//     </motion.svg>
//   );
// };

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
