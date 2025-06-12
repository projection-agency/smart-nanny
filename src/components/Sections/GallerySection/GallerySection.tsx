"use client";

import { useRef } from "react";
import { Container } from "@/components/Container";
import s from "./GallerySection.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "./SwiperButton.css";
import { motion } from "framer-motion";

const slides = [
  "/images/gallery/1.jpg",
  "/images/gallery/2.jpg",
  "/images/gallery/3.jpg",
  "/images/gallery/4.jpg",
  "/images/gallery/5.jpg",
  "/images/gallery/6.jpg",
  "/images/gallery/7.jpg",
  "/images/gallery/8.jpg",
];

export const GallerySection = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  const lineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    show: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1.6, ease: "easeInOut" },
    },
  };

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <div className={s.topBlock}>
          <motion.div
            className={s.titleContainer}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2>
              Погляньте, як працюють
              <span>
                наші турботливі няні
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
              </span>
            </h2>
            <p>
              Ознайомтесь із нашими нянями через щирі фото з реального життя. Ви
              побачите людей, які щодня турбуються про дітей з любовʼю, турботою
              та професійним підходом.
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
              <span>Гортай праворуч</span>
              <svg
                viewBox="0 0 54 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g filter="url(#filter0_g_878_5632)">
                  <path
                    d="M3.29464 2.87082C4.00076 2.79837 7.09918 2.89935 7.8047 3.02392C9.41295 3.30787 10.9823 3.21888 12.3469 3.24754C13.7057 3.27608 15.2847 3.91983 16.6283 3.98836C17.4742 4.0315 17.9783 4.12334 18.8188 4.15574C19.1818 4.16974 19.8507 4.28134 20.2168 4.40858C23.2103 5.44896 25.4662 6.15293 27.5776 7.86699C28.7645 8.83052 29.9514 9.79406 31.1382 10.7576C32.1168 11.552 32.6452 12.3537 33.3309 13.3982C34.0253 14.456 34.817 15.6226 35.2874 16.7936C35.7161 17.8612 36.4931 18.7636 36.8652 19.8602C37.5383 21.8442 38.2165 23.8121 39.0313 25.7279C40.3873 28.9163 41.4982 32.0993 42.4385 35.4214C42.9779 37.3273 43.5395 39.4982 43.3405 41.4677C43.1397 43.4552 43.047 45.5594 43.0331 47.5325C43.0285 48.1958 42.6543 49.2086 42.7925 49.8436M36.2954 41.9567C36.8193 42.382 37.9531 44.5378 38.3524 45.1203C38.8146 45.7945 42.159 49.1949 42.7737 49.7315C43.8674 48.922 45.7157 47.7499 46.7908 46.8934C48.0689 45.875 49.0156 44.4444 50.0391 43.1837C50.3389 42.8143 50.88 41.8246 51.4306 41.9468"
                    stroke="#FF91B2"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_g_878_5632"
                    x="0.872969"
                    y="0.425703"
                    filterUnits="userSpaceOnUse"
                    colorInterpolationFilters="sRGB"
                  >
                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                    <feBlend
                      mode="normal"
                      in="SourceGraphic"
                      in2="BackgroundImageFix"
                      result="shape"
                    />
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.085034012794494629 0.085034012794494629"
                      numOctaves="3"
                      seed="4180"
                    />
                    <feDisplacementMap
                      in="shape"
                      scale="1.8400000333786011"
                      xChannelSelector="R"
                      yChannelSelector="G"
                      result="displacedImage"
                    />
                    <feMerge result="effect1_texture_878_5632">
                      <feMergeNode in="displacedImage" />
                    </feMerge>
                  </filter>
                </defs>
              </svg>
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
          viewport={{ once: false, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        >
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
