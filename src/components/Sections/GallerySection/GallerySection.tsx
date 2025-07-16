"use client";

import { useRef, useEffect, useState } from "react";
import { Container } from "@/components/Container";
import s from "./GallerySection.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "./SwiperButton.css";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import i18n from "@/i18n/client";
import { AnimatedLine } from "@/components/AnimatedLine/AnimatedLine";

export const GallerySection = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // SSR-safe for all text fields
  const galleryTitle = !isReady
    ? (translation && translation["gallery_title"]) || ""
    : null;
  const gallerySubtitle = !isReady
    ? (translation && translation["gallery_subtitle"]) || ""
    : t("gallery_subtitle");
  const galleryHint = !isReady
    ? (translation && translation["gallery_hint"]) || ""
    : t("gallery_hint");

  const slides = [
    "/images/gallery/2.jpg",
    "/images/gallery/3.jpg",
    "/images/gallery/4.jpg",
    "/images/gallery/5.jpg",
    "/images/gallery/6.jpg",
    "/images/gallery/8.jpg",
    "/images/gallery/9.jpg",
    "/images/gallery/10.jpg",
    "/images/gallery/11.jpg",
  ];

  // const lineVariants = {
  //   hidden: { pathLength: 0, opacity: 0 },
  //   show: {
  //     pathLength: 1,
  //     opacity: 1,
  //     transition: { duration: 1.6, ease: "easeInOut" },
  //   },
  // };

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <div className={s.topBlock}>
          <motion.div
            className={s.titleContainer}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2>
              {!isReady ? (
                typeof galleryTitle === "string" ? (
                  galleryTitle
                ) : (
                  ""
                )
              ) : (
                <Trans
                  i18nKey="gallery_title"
                  components={{
                    span: <span />,
                    line: <AnimatedLine stroke={"#FF91B2"} />,
                  }}
                />
              )}
            </h2>
            <p>
              {!isReady
                ? typeof gallerySubtitle === "string"
                  ? gallerySubtitle
                  : ""
                : t("gallery_subtitle")}
            </p>
            <Image
              alt="Worm"
              width={1920}
              height={1080}
              priority
              src="/icons/worm.svg"
              className={s.worm}
            />
          </motion.div>

          <div className={s.swiperController}>
            <div className={s.hint}>
              <span>
                {!isReady
                  ? typeof galleryHint === "string"
                    ? galleryHint
                    : ""
                  : t("gallery_hint")}
              </span>
              <motion.svg
                viewBox="0 0 54 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid meet"
                style={{ display: "block" }}
              >
                <motion.path
                  d="M3.29464 2.87082C4.00076 2.79837 7.09918 2.89935 7.8047 3.02392C9.41295 3.30787 10.9823 3.21888 12.3469 3.24754C13.7057 3.27608 15.2847 3.91983 16.6283 3.98836C17.4742 4.0315 17.9783 4.12334 18.8188 4.15574C19.1818 4.16974 19.8507 4.28134 20.2168 4.40858C23.2103 5.44896 25.4662 6.15293 27.5776 7.86699C28.7645 8.83052 29.9514 9.79406 31.1382 10.7576C32.1168 11.552 32.6452 12.3537 33.3309 13.3982C34.0253 14.456 34.817 15.6226 35.2874 16.7936C35.7161 17.8612 36.4931 18.7636 36.8652 19.8602C37.5383 21.8442 38.2165 23.8121 39.0313 25.7279C40.3873 28.9163 41.4982 32.0993 42.4385 35.4214C42.9779 37.3273 43.5395 39.4982 43.3405 41.4677C43.1397 43.4552 43.047 45.5594 43.0331 47.5325C43.0285 48.1958 42.6543 49.2086 42.7925 49.8436M36.2954 41.9567C36.8193 42.382 37.9531 44.5378 38.3524 45.1203C38.8146 45.7945 42.159 49.1949 42.7737 49.7315C43.8674 48.922 45.7157 47.7499 46.7908 46.8934C48.0689 45.875 49.0156 44.4444 50.0391 43.1837C50.3389 42.8143 50.88 41.8246 51.4306 41.9468"
                  stroke="#FF91B2"
                  strokeWidth="3"
                  strokeLinecap="butt"
                  strokeLinejoin="round"
                  pathLength={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{
                    duration: 1.2,
                    ease: "easeOut",
                    repeat: Infinity,
                    repeatDelay: 2,
                    repeatType: "reverse",
                  }}
                  viewport={{ once: true, amount: 0.5 }}
                />
              </motion.svg>
            </div>

            <div ref={prevRef} className={s.swiperPrev}>
              {arrow}
            </div>
            <div ref={nextRef} className={s.swiperNext}>
              {arrow}
            </div>
          </div>
        </div>

        <motion.div
          className={s.swiperWrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
          {isClient && (
            <Swiper
              modules={[Navigation, Pagination]}
              breakpoints={{
                0: {
                  slidesPerView: 1.1,
                  spaceBetween: 12,
                  navigation: { enabled: false },
                  pagination: { enabled: true },
                },
                1024: {
                  spaceBetween: 36,
                  slidesPerView: 4.2,
                  navigation: { enabled: true },
                  pagination: { enabled: false },
                },
              }}
              pagination={{
                enabled: true,
                type: "bullets",
                el: `.${s.paginationCont}`,
                bulletElement: "p",
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onInit={(swiper) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                swiper.params.navigation.prevEl = prevRef.current;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                swiper.params.navigation.nextEl = nextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }}
              className={`${s.swiper} swiper`}
            >
              {slides.map((src, index) => (
                <SwiperSlide key={index}>
                  <Image
                    src={src}
                    alt={`Slide ${index + 1}`}
                    width={600}
                    height={400}
                    className={s.image}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
          <div className={s.paginationCont}></div>
        </motion.div>
      </Container>
    </section>
  );
};

export const arrow = (
  <svg viewBox="0 0 42 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M31.2969 21.8418C31.6564 22.1611 32.1884 22.1612 32.5479 21.8418L32.6221 21.7686L41.167 12.4053H41.166C41.2428 12.3243 41.4549 12.0766 41.4844 11.6846L41.4834 11.4971C41.4504 11.1025 41.2258 10.8461 41.166 10.7822L41.167 10.7812L32.6221 1.41992L32.6211 1.41895C32.2645 1.03027 31.6835 1.00191 31.2969 1.3457L31.2227 1.41992C30.8656 1.81135 30.8655 2.42995 31.2227 2.82129L38.2812 10.5547H1.48047C0.905685 10.5547 0.512695 11.0498 0.512695 11.5684C0.512795 12.0851 0.905166 12.582 1.48047 12.582H38.3271L31.2227 20.3672C30.8655 20.7586 30.8655 21.3772 31.2227 21.7686L31.2969 21.8418Z"
      strokeWidth="0.975"
    />
  </svg>
);
