"use client";

import { Container } from "@/components/Container";
import s from "./ReviewSection.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import { API_URL } from "@/constants";
import { AnimatedLine } from "@/components/AnimatedLine/AnimatedLine";
import "simplebar-react/dist/simplebar.min.css";
import SimpleBar from "simplebar-react";
// import "./ScrollBox.css"; // для додаткової кастомізації (див. нижче)
interface Review {
  id: number;
  Photo: string;
  Full_name: string;
  Review: string;
  Date: string;
  Location: string;
}

export const ReviewSection = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const paginationRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);

  const { t, i18n } = useTranslation("common");

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale, i18n]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`${API_URL}v2/review?lang=${locale}`);
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error("Помилка при отриманні відгуків:", error);
      }
    };
    fetchReviews();
  }, [locale]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const reviewsRaw = !isReady
    ? (translation && (translation["reviews"] as unknown[])) || []
    : t("reviews", { returnObjects: true }) || [];
  const reviewsSSR = Array.isArray(reviewsRaw) ? reviewsRaw : [];

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <motion.div
          className={s.wrapper}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once:true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once:true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {!isReady ? (
              (translation && (translation["review_title"] as string)) || ""
            ) : (
              <>
                <Trans i18nKey="review_title" />{" "}
                <span>
                  <Trans i18nKey="review_title_span" />
                  <AnimatedLine stroke={"#FF91B2"} />
                </span>
              </>
            )}
          </motion.h2>

          <motion.p
            className={s.desc}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once:true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          >
            {t("review_desc")}
          </motion.p>

          <motion.div
            className={s.imageContainerMobile}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once:true, amount: 0.7 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          >
            <Image
              src="/images/reviewImageMob.png"
              alt="Family"
              width={1920}
              height={1080}
            />
          </motion.div>

          {isClient && isReady && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once:true, amount: 0.7 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
            >
              <Swiper
                modules={[Navigation, Pagination]}
                breakpoints={{
                  0: { navigation: { enabled: false } },
                  1024: { navigation: { enabled: true } },
                }}
                navigation={{
                  nextEl: `.${s.swiperNext}`,
                  prevEl: `.${s.swiperPrev}`,
                }}
                pagination={{
                  el: paginationRef.current,
                  clickable: true,
                  renderBullet: (_, className) =>
                    `<span class="${className}"></span>`,
                }}
                slidesPerView={1}
                className={s.swiper}
              >
                {(reviews.length > 0 ? reviews : reviewsSSR).map((review) => (
                  <SwiperSlide key={review.id}>
                    <div className={s.card}>
                      <div className={s.header}>
                        <Image
                          width={1920}
                          height={1080}
                          src={review.Photo}
                          alt={review.Full_name}
                          className={s.avatar}
                        />
                        <div className={s.name}>{review.Full_name}</div>
                      </div>
                      <SimpleBar className={s.text}>
                        {review.Review}
                      </SimpleBar>
                      <div className={s.footer}>
                        <span>{review.Date}</span>
                        <span>{review.Location}</span>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>
          )}

          <div className={s.swiperController}>
            <button className={s.swiperPrev}>{arrow}</button>
            <div ref={paginationRef} className="dots"></div>
            <button className={s.swiperNext}>{arrow}</button>
          </div>
        </motion.div>

        <div className={s.imageContainer}>
          <Image
            src="/images/reviewImage.png"
            alt="Family"
            width={1920}
            height={1080}
          />
        </div>
      </Container>
    </section>
  );
};

const arrow = (
  <svg viewBox="0 0 42 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M31.2969 21.3418C31.6564 21.6611 32.1884 21.6612 32.5479 21.3418L32.6221 21.2686L41.167 11.9053H41.166C41.2428 11.8243 41.4549 11.5766 41.4844 11.1846L41.4834 10.9971C41.4504 10.6025 41.2258 10.3461 41.166 10.2822L41.167 10.2812L32.6221 0.919922L32.6211 0.918945C32.2645 0.530265 31.6835 0.501907 31.2969 0.845703L31.2227 0.919922C30.8656 1.31135 30.8655 1.92995 31.2227 2.32129L38.2812 10.0547H1.48047C0.905685 10.0547 0.512695 10.5498 0.512695 11.0684C0.512795 11.5851 0.905166 12.082 1.48047 12.082H38.3271L31.2227 19.8672C30.8655 20.2586 30.8655 20.8772 31.2227 21.2686L31.2969 21.3418Z"
      strokeWidth="0.975"
    />
  </svg>
);
