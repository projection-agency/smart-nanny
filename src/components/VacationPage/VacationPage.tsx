"use client";

import { VacationController } from "@/components/VacationController/VacationController";
import s from "../../app/[locale]/vacation/vacation.module.css";
import { Container } from "@/components/Container";
import { VacationItem } from "@/components/VacationItem/VacationItem";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredVacations } from "@/store/selectors";
import { AppDispatch } from "@/store/store";
import { fetchVacations } from "@/store/vacationSlice";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VacancySidebar from "@/components/VacancySidebar/VacancySidebar";
import {
  Breadcrumbs,
  BreadcrumbItem,
} from "@/components/Breadcrumbs/Breadcrumbs";
import { useTranslation, Trans } from "react-i18next";
import i18n from "@/i18n/client";
import Spinner from "@/components/Spinner";
import { AnimatedLine } from "../AnimatedLine/AnimatedLine";

export const VacationPage = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const { t } = useTranslation("common");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    dispatch(fetchVacations(locale));
  }, [dispatch, locale]);

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  const filtered = useSelector(selectFilteredVacations);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: !isReady
        ? (translation && (translation["breadcrumbs_home"] as string)) || ""
        : t("breadcrumbs_home"),
      href: `/${locale}`,
    },
    {
      label: !isReady
        ? (translation && (translation["breadcrumbs_vacation"] as string)) || ""
        : t("breadcrumbs_vacation"),
      active: true,
    },
  ];

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="dark" />
      <section className={s.section}>
        <motion.div className={s.titleCOntainer}>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once:true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {!isReady ? (
              (translation && (translation["vacation_hero_title"] as string)) ||
              ""
            ) : (
              <Trans
                i18nKey="vacation_hero_title"
                components={{
                  0: <AnimatedLine stroke="#ff91b2" />,
                  1: <span />,
                }}
              />
            )}
            {svg}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once:true, amount: 0.6 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {!isReady
              ? (translation &&
                  (translation["vacation_hero_desc"] as string)) ||
                ""
              : t("vacation_hero_desc")}
          </motion.p>
        </motion.div>

        <motion.div
          className={`lg:mb-[3.7vw] ${s.vacationControllerDesktop}`}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once:true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <VacationController translation={translation} locale={locale} />
        </motion.div>

        <motion.button
          className={s.openSidebarBtn}
          onClick={() => openModal()}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once:true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Image
            width={17}
            height={16}
            src="/icons/icon-filter.svg"
            alt="filter"
          />
          {t("vacation_mobile_filter")}
        </motion.button>

        <Container className={s.container}>
          {!filtered || filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              style={{
                minHeight: "50vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spinner />
            </motion.div>
          ) : (
            <ul className={s.vacationsList}>
              {filtered.map((item, index) => (
                <VacationItem key={index} item={item} />
              ))}
            </ul>
          )}
        </Container>
      </section>

      {!isDesktop && (
        <VacancySidebar
          isOpen={modalIsOpen}
          onClose={closeModal}
          translation={translation}
          locale={locale}
        />
      )}
    </main>
  );
};

const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 73 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M37.2645 27.2955C40.115 27.4948 43.128 26.2379 45.675 25.0087C49.6196 23.105 53.6534 21.7021 57.5486 19.61C62.446 16.9796 66.9069 13.684 71.5095 10.6438"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M41.7623 34.6274C45.4845 34.8877 49.2068 35.148 52.929 35.4083C55.573 35.5932 58.098 35.7387 60.7419 35.4813C61.8636 35.372 62.769 35.7855 63.7784 35.1645"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M4.25 11.9561C10.3867 15.4242 14.559 17.2354 20.4486 21.7878C28.4227 29.8543 32.8622 36.8304 34.5417 46.2696C35.8946 53.8728 36.3099 55.2242 35.8164 62.2806"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M33.9029 18.0387C34.0797 17.0759 35.7332 16.1304 36.4526 15.5119C37.8245 14.3326 38.9778 13.0064 40.3504 11.8265C42.3848 10.0776 44.151 7.82947 45.9007 5.79019C46.4753 5.12045 47.11 4.31346 47.9176 3.98203"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
