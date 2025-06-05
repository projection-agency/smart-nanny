"use client";

import { useModal } from "@/components/ModalContext";
import { btnSvg } from "../BlogSection/BlogSection";
import s from "./HomeHero.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

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

export const HomeHero = () => {
  const { openModal } = useModal();

  return (
    <section className={s.section}>
      <div className={s.homeHeroImage}>
        <Image
          src="/images/home-hero-kids.png"
          alt="Hero image"
          width={1920}
          height={1080}
          priority
        />
      </div>
      <div className={s.homeHeroImageMobile}>
        <Image
          src="/images/home-hero-kids-mobile.png"
          alt="Hero image"
          width={1225}
          height={1083}
          priority
        />

        <Image
          alt="Sun"
          width={1920}
          height={1080}
          priority
          src="/icons/sun.svg"
          className={s.sun}
        />
      </div>
      <motion.div
        className={s.content}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.h1 variants={itemVariants}>
          {svg}
          Надійний підбір <span>професійних {line} </span> нянь для вашої родини
        </motion.h1>

        <motion.p variants={itemVariants}>
          Ми знаходимо нянь, яким можна довірити найцінніше – вашу дитину.
        </motion.p>

        <motion.button
          variants={itemVariants}
          onClick={() => {
            openModal("formA");
          }}
          className={s.btn}
        >
          <div className={s.first}>{btnSvg}</div>
          Підібрати няню
          <div className={s.second}>{btnSvg}</div>
        </motion.button>
        <Image
          alt="Plate"
          width={1920}
          height={1080}
          priority
          src="/icons/plate.svg"
          className={s.plate}
        />
        <Image
          alt="Worm"
          width={1920}
          height={1080}
          priority
          src="/icons/worm.svg"
          className={s.worm}
        />
      </motion.div>
    </section>
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

const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 70 63"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M35.3242 25.1965C38.1848 25.1965 41.1059 23.7613 43.5635 22.385C47.3697 20.2535 51.3 18.6058 55.0438 16.2934C59.7508 13.3862 63.9755 9.85823 68.3594 6.57031"
      stroke="#ACE2FF"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M40.9453 32.5759C44.7005 32.5759 48.4557 32.5759 52.2108 32.5759C54.8782 32.5759 57.4234 32.5542 60.0596 32.244C61.178 32.1124 62.1161 32.358 63.0859 31.873"
      stroke="#ACE2FF"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M1.5 13.2578C7.77273 16.2578 12 17.7578 18.1043 21.8452C26.5 29.2578 31.3451 35.838 33.6457 45.0401C35.4987 52.4525 36 53.7578 36 60.7578"
      stroke="#ACE2FF"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M31.8086 16.7604C31.915 15.8032 33.456 14.7615 34.1125 14.1051C35.3643 12.8532 36.3939 11.4722 37.6464 10.2197C39.5028 8.36334 41.0648 6.0353 42.6251 3.91338C43.1375 3.2165 43.6988 2.38078 44.4604 2"
      stroke="#ACE2FF"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
