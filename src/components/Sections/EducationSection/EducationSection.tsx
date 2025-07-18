"use client";
import { Container } from "@/components/Container";
import s from "./EducationSection.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/client";
import Link from "next/link";
import { AnimatedLine } from "@/components/AnimatedLine/AnimatedLine";

export const EducationSection = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const { t } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  // SSR-safe stats
  const statsRaw = !isReady
    ? (translation && (translation["education_stats"] as unknown[])) || []
    : t("education_stats", { returnObjects: true }) || [];
  const stats = Array.isArray(statsRaw) ? statsRaw : [];

  // const faqsRaw = !isReady
  //   ? (translation && translation['education_faq'] as unknown[]) || []
  //   : t('education_faq', { returnObjects: true }) || [];
  // const faqs = Array.isArray(faqsRaw) ? faqsRaw : [];

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <motion.div
          className={s.topBlock}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className={s.imageBlockMobile}>
            <Image
              width={1920}
              height={1080}
              src="/images/get-kid.jpg"
              alt="Image"
            />
            <Image
              width={1920}
              height={1080}
              src="/icons/yellow-palte.svg"
              alt="Image"
              className={s.palte}
            />
          </div>

          <motion.div
            className={s.contentBlock}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {cornerSvg}

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              {svg}
              {!isReady
                ? (translation && (translation["education_title"] as string)) ||
                  ""
                : t("education_title")}
              <span>
                {String(t("education_title_highlight"))}
                {<AnimatedLine stroke="#fff9c1"/>}
              </span>
            </motion.h2>

            <motion.div
              className={s.textBlock}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {!isReady
                  ? typeof translation["education_desc1"] === "string"
                    ? translation["education_desc1"]
                    : ""
                  : String(t("education_desc1"))}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {!isReady
                  ? typeof translation["education_desc2"] === "string"
                    ? translation["education_desc2"]
                    : ""
                  : String(t("education_desc2"))}
              </motion.p>
            </motion.div>

            <Link href={`/${locale}/education`} passHref>
              <motion.button
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                {!isReady
                  ? typeof translation["education_btn"] === "string"
                    ? translation["education_btn"]
                    : ""
                  : typeof t("education_btn") === "string"
                  ? t("education_btn")
                  : ""}
              </motion.button>
            </Link>
          </motion.div>

          <div className={s.imageBlock}>
            <Image
              width={1920}
              height={1080}
              src="/images/education.jpg"
              alt="Image"
            />
            <Image
              width={1920}
              height={1080}
              src="/icons/yellow-palte.svg"
              alt="Image"
              className={s.palte}
            />
          </div>
        </motion.div>

        <div className={s.clouds}>
          <Image
            width={1920}
            height={1080}
            src="/images/cloud1.png"
            alt="Cloud"
            className={s.cloud1}
          />
          <Image
            width={1920}
            height={1080}
            src="/images/cloud2.png"
            alt="Cloud"
            className={s.cloud2}
          />
        </div>

        <motion.div
          className={s.bottomBlock}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <ul>
            {stats.map((item: unknown, index: number) => {
              const stat = item as { value: string; description: string };
              return (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <span>{stat.value}</span>
                  <p>{stat.description}</p>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>
      </Container>
    </section>
  );
};

// const line = (
//   <motion.svg
//     viewBox="0 0 220 18"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     style={{ verticalAlign: "middle" }}
//     preserveAspectRatio="xMidYMid meet"
//   >
//     <motion.path
//       d="M2 15.5937C2.50964 12.3212 11.318 10.1408 14.4779 9.29537C21.4919 7.41876 26.8309 4.44253 34.4168 4.44253C39.0254 4.44253 58.4887 1.13116 48.567 7.54239C46.0104 9.19443 46.0078 8.27138 44.6875 10.126C42.879 12.6664 46.1597 10.7979 48.2251 10.5906C58.4182 9.56794 67.1937 9.8962 77.5106 9.19443C94.2098 8.05852 112.888 10.3149 129.358 7.85015C141.698 6.00349 154.619 6.14857 166.9 4.44244C175.037 3.31199 183.245 1.86114 191.534 1.86114C194.272 1.86114 200.964 0.55406 200.732 3.71968C200.605 5.44573 193.874 7.7148 192.049 8.36602C190.036 9.08402 179.489 12.0831 183.366 12.0831C200.779 12.0831 200.944 9.9442 218 7.29006"
//       stroke="#FFF9C1"
//       strokeWidth="3"
//       strokeLinecap="round"
//       pathLength={1}
//       initial={{ pathLength: 0 }}
//       whileInView={{ pathLength: 1 }}
//       transition={{ duration: 1.2, ease: "easeOut" }}
//       viewport={{ once:true, amount: 0.5 }}
//     />
//   </motion.svg>
// );

const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 45 49"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M25.9572 25.1365C26.2387 23.3399 27.4396 21.6486 28.5575 20.2424C30.2887 18.0646 31.7243 15.7606 33.5644 13.6401C35.8781 10.9739 38.5393 8.67256 41.0634 6.2473"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M22.6249 20.5644C22.9925 18.2186 23.3601 15.8727 23.7277 13.5269C23.9888 11.8605 24.2379 10.2706 24.496 8.62373C24.6055 7.92506 24.6973 7.33907 24.7923 6.73323"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M30.6094 47.1211C29.3567 42.876 28.8381 40.0662 26.8903 35.8209C23.0939 29.8069 19.4664 26.1111 13.9517 23.7621C9.50953 21.8699 8.74454 21.4265 4.37679 20.7421"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M31.5733 28.0403C32.1604 28.0642 32.9387 27.1999 33.3984 26.8517C34.275 26.1879 35.2077 25.6751 36.0848 25.0109C37.3848 24.0264 38.9401 23.2703 40.371 22.4959C40.841 22.2416 41.3994 21.9698 41.7033 21.53"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const cornerSvg = (
  <motion.svg
    className={s.cornerSvg}
    viewBox="0 0 130 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ verticalAlign: "middle" }}
    preserveAspectRatio="xMidYMid meet"
  >
    <motion.path
      d="M125.322 84.1856C122.199 83.6179 119.911 79.7388 117.318 78.0677C114.823 76.4596 112.353 73.9371 110.425 71.6984C102.962 63.031 94.1776 55.6399 86.3935 47.2268C82.8291 43.3743 79.5364 40.5104 77.2376 35.9129C76.2897 34.017 75.1599 31.761 73.6549 30.2559C73.0146 29.6157 72.2058 28.5667 72.1464 27.616C72.1251 27.276 72.1464 28.9324 72.1464 29.3131C72.1464 30.7464 73.104 32.1735 73.2777 33.6501C73.4688 35.2742 74.0486 37.4018 74.4301 39.1185C74.8915 41.195 74.7863 43.3518 74.7863 45.5297C74.7863 54.4702 75.2821 63.5689 74.7863 72.4946C74.6178 75.5279 72.8821 79.2304 71.6854 81.9229C70.3043 85.0303 67.8642 88.0907 65.5256 90.4293C62.6044 93.3504 60.296 96.2139 56.4745 97.9509C53.1121 99.4793 48.9123 101.534 45.1815 101.534C41.6083 101.534 38.4065 101.005 34.978 100.381C33.0188 100.025 31.4505 98.8104 29.9077 97.8462C28.6475 97.0586 29.1534 94.5355 29.1534 93.2368C29.1534 91.6664 30.3778 90.974 31.7933 90.974C33.4216 90.974 34.7292 93.6604 34.8104 95.1224C35.0549 99.5232 32.1582 101.32 29.7191 104.572C27.8721 107.034 25.6406 109.07 23.8736 111.632C22.0651 114.255 20.1568 115.321 17.2738 116.43C12.6946 118.192 6.83346 117.373 2 117.373"
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
      viewport={{ once:true, amount: 0.5 }}
    />
    <motion.path
      d="M91.7578 75.1348C91.7578 76.7137 93.0161 77.9015 94.1044 78.9899C95.7558 80.6413 97.6631 82.1791 99.489 83.5993C100.517 84.399 101.545 85.3762 102.883 85.6735C104.711 86.0797 106.609 86.6879 107.597 88.3343"
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
      viewport={{ once:true, amount: 0.5 }}
    />
    <motion.path
      d="M94.0195 31.0098C99.4114 31.0098 104.173 34.4039 109.482 34.4039"
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
      viewport={{ once:true, amount: 0.5 }}
    />
    <motion.path
      d="M91.3789 12.9077C99.3447 12.9077 106.622 11.4892 113.839 8.00498C116.628 6.65859 119.566 5.51845 122.283 4.02415C123.897 3.13605 126.057 1.59375 127.961 1.59375"
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
      viewport={{ once:true, amount: 0.5 }}
    />
  </motion.svg>
);
