"use client";

import { Container } from "@/components/Container";
import s from "./FaqSection.module.css";
import { Accordion } from "@/components/Accordion/Accordion";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "@/constants";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { AnimatedLine } from "@/components/AnimatedLine/AnimatedLine";

type FaqItem = {
  id: number;
  Question: string;
  Answer: string;
  faq_categories: { slug: string; uk_id?: number }[];
  faq_category: number[];
};

export const FaqSection = ({
  translation,
  locale,
}: {
  nannys?: boolean;
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const pathname: string = usePathname();
  const { t, i18n } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const lang = (i18n.language === "ua" ? "ua" : i18n.language).toLowerCase();
    const fetchFaqs = async () => {
      try {
        const response = await fetch(
          `${API_URL}v2/faq?per_page=16&lang=${lang}`
        );
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Помилка при отриманні FAQ:", error);
      }
    };
    fetchFaqs();
  }, [i18n.language]);

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale, i18n]);

  const { parentsFaqs, nannysFaqs, courseFaqs } = useMemo(() => {
    const parents: FaqItem[] = [];
    const nannys: FaqItem[] = [];
    const course: FaqItem[] = [];

    // faqs?.forEach((faq) => {
    //   if (faq.faq_categories?.[0]?.slug === "about-course") {
    //     parents.push(faq);
    //   } else {
    //     nannys.push(faq);
    //   }
    // });

    faqs?.forEach((faq) => {
      const ukId = faq.faq_categories?.[0]?.uk_id;
      if (ukId === 2) {
        parents.push(faq);
      } else if (ukId === 4) {
        course.push(faq);
      } else if (ukId === 3) {
        nannys.push(faq);
      }
    });

    return { parentsFaqs: parents, nannysFaqs: nannys, courseFaqs: course };
  }, [faqs]);

  const currentFaqs =
    (pathname.includes("/education") && courseFaqs) ||
    (pathname.includes("/nanny-selection") && nannysFaqs) ||
    (pathname.includes("/") && parentsFaqs) ||
    [];

  // SSR-only faqs (translation)
  // const faqsRaw = !isReady
  //   ? (translation && translation['faq'] as unknown[]) || []
  //   : t('faq', { returnObjects: true }) || [];
  // const faqsSSR = Array.isArray(faqsRaw) ? faqsRaw : [];

  return (
    <section className={s.section}>
      <Container className={s.container}>
        <motion.h2
          className={s.title}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.7 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {(() => {
            if (!isReady) {
              return (
                (translation && (translation["faq_title"] as string)) || ""
              );
            } else {
              return t("faq_title") || "";
            }
          })()}
          <span>
            {" "}
            {(pathname.includes("education") && t("faq_from_course")) ||
              (pathname.includes("nanny-selection") && t("faq_from_nanny")) ||
              (pathname.includes("/") && t("faq_from_parents"))}
            <AnimatedLine stroke={"#FF91B2"} />
          </span>
        </motion.h2>

        <ul className={s.faqList}>
          {currentFaqs.map((item) => (
            <li key={item.id}>
              <Accordion
                id={item.id}
                isOpen={openId === item.id}
                onToggle={toggle}
                title={item.Question}
                faq={true}
              >
                <p>{item.Answer}</p>
              </Accordion>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};
