"use client";
import { EducationTariffs } from "@/components/EducationTariffs/EducationTariffs";
import s from "./TariffSection.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { Trans } from 'react-i18next';

export const TariffSection = () => {
  return (
    <section className={s.section}>
      <h2 className={s.title}>
        {svg}
        <Trans
          i18nKey="tariff_title"
          components={{ 
            span: <span />, 
            line: <Line />
          }}
        />
      </h2>

      <EducationTariffs />

      <Image
        alt="flower"
        width={1920}
        height={1080}
        priority
        src="/icons/yellow-sun.svg"
        className={s.flower}
      />

      <Image
        alt="sun"
        width={1920}
        height={1080}
        priority
        src="/icons/yellow-flower.svg"
        className={s.sun}
      />

      {noName}
    </section>
  );
};

const Line = () => {
  return (
    <motion.svg
      viewBox="0 0 215 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "auto", verticalAlign: "middle" }}
      preserveAspectRatio="xMidYMid meet"
    >
      <motion.path
        d="M2.00004 20.7578C2.45188 17.5375 10.2611 15.3919 13.0626 14.56C19.2811 12.7133 24.0145 9.7846 30.74 9.7846C34.8258 9.7846 52.0815 6.52609 43.2852 12.835C41.0185 14.4606 41.0163 13.5523 39.8457 15.3773C38.2423 17.8772 41.1509 16.0385 42.982 15.8346C52.0189 14.8282 59.7991 15.1512 68.9458 14.4606C83.7509 13.3429 100.311 15.5632 114.913 13.1378C125.853 11.3206 137.308 11.4634 148.196 9.78451C155.411 8.67211 162.687 7.24442 170.036 7.24442C172.464 7.24442 178.396 5.9582 178.191 9.07329C178.078 10.7718 172.111 13.0046 170.492 13.6455C168.708 14.352 159.357 17.3032 162.794 17.3032C178.232 17.3032 192.608 14.4284 207.729 11.8166C220.689 9.57803 233.794 5.41555 246.961 5.41555C262.394 5.41555 277.11 3.58668 292.637 3.58668C298.544 3.58668 303.415 1.68424 303.415 7.70164C303.415 9.69628 303.166 11.8532 302.16 13.6455C301.673 14.513 297.455 18.4038 298.282 16.7444C300.841 11.6149 311.575 11.429 316.758 9.78451C324.582 7.30183 333.611 5.67529 341.848 4.50112C349.491 3.41176 357.215 1.75781 365 1.75781"
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
  )
};

const noName = (
  <motion.svg
    className={s.svg}
    viewBox="0 0 130 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: "middle" }}
    preserveAspectRatio="xMidYMid meet"
  >
    <motion.path
      d="M125.322 84.5919C122.199 84.0242 119.911 80.145 117.318 78.474C114.823 76.8658 112.353 74.3433 110.425 72.1047C102.962 63.4372 94.1776 56.0462 86.3935 47.6331C82.8291 43.7806 79.5364 40.9166 77.2376 36.3191C76.2897 34.4233 75.1599 32.1672 73.6549 30.6622C73.0146 30.0219 72.2058 28.973 72.1464 28.0222C72.1251 27.6823 72.1464 29.3387 72.1464 29.7193C72.1464 31.1527 73.104 32.5798 73.2777 34.0563C73.4688 35.6804 74.0486 37.808 74.4301 39.5247C74.8915 41.6013 74.7863 43.758 74.7863 45.936C74.7863 54.8765 75.2821 63.9752 74.7863 72.9008C74.6178 75.9342 72.8821 79.6366 71.6854 82.3291C70.3043 85.4366 67.8642 88.4969 65.5256 90.8355C62.6044 93.7567 60.296 96.6201 56.4745 98.3572C53.1121 99.8855 48.9123 101.94 45.1815 101.94C41.6083 101.94 38.4065 101.411 34.978 100.788C33.0188 100.431 31.4505 99.2167 29.9077 98.2524C28.6475 97.4648 29.1534 94.9417 29.1534 93.643C29.1534 92.0727 30.3778 91.3802 31.7933 91.3802C33.4216 91.3802 34.7292 94.0667 34.8104 95.5287C35.0549 99.9294 32.1582 101.726 29.7191 104.978C27.8721 107.441 25.6406 109.476 23.8736 112.039C22.0651 114.661 20.1568 115.728 17.2738 116.837C12.6946 118.598 6.83346 117.779 2 117.779"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M91.7578 75.541C91.7578 77.1199 93.0161 78.3078 94.1044 79.3961C95.7558 81.0475 97.6631 82.5854 99.489 84.0055C100.517 84.8052 101.545 85.7824 102.883 86.0797C104.711 86.4859 106.609 87.0941 107.597 88.7406"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M94.0195 31.416C99.4114 31.416 104.173 34.8102 109.482 34.8102"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
    <motion.path
      d="M91.3789 13.3139C99.3447 13.3139 106.622 11.8954 113.839 8.41123C116.628 7.06484 119.566 5.9247 122.283 4.4304C123.897 3.5423 126.057 2 127.961 2"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="butt"
      pathLength={1}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      transition={{
        duration: 1.2,
        ease: "easeOut",
        repeat: Infinity,
        repeatType: "reverse",
        repeatDelay: 2,
      }}
      viewport={{ once: false, amount: 0.5 }}
    />
  </motion.svg>
);

const svg = (
  <svg
    className={s.svgMobile}
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
