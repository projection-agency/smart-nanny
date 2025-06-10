"use client";

import { Container } from "@/components/Container";
import s from "./FaqSection.module.css";
import { Accordion } from "@/components/Accordion/Accordion";
import { useEffect, useMemo, useState } from "react";
import { API_URL } from "@/constants";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

type FaqItem = {
  id: number;
  Question: string;
  Answer: string;
  faq_categories: { slug: string }[];
  faq_category: number[];
};

export const FaqSection = ({ nannys }: { nannys?: boolean }) => {
  const [openId, setOpenId] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>([]);
  const pathname: string = usePathname();

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${API_URL}v2/faq?per_page=100`);
        const data = await response.json();
        setFaqs(data);
      } catch (error) {
        console.error("Помилка при отриманні FAQ:", error);
      }
    };

    fetchFaqs();
  }, []);

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
      if (faq.faq_category?.[0] === 2) {
        parents.push(faq);
      } else if (faq.faq_category?.[0] === 4) {
        course.push(faq);
      } else if (faq.faq_category?.[0] === 3) {
        nannys.push(faq);
      }
    });

    return { parentsFaqs: parents, nannysFaqs: nannys, courseFaqs:course };
  }, [faqs]);

  const currentFaqs = (pathname.includes("education") && courseFaqs) || (pathname.includes("/") && parentsFaqs) || (pathname.includes("nanny-selection") && nannysFaqs) || [];

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
          Часті питання
          <span>
            {" "}
            {nannys ? "від нянь" : "від батьків"} {line}
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

const line = (
  <svg viewBox="0 0 245 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.5 15.5938C2.06509 12.3212 11.8317 10.1408 15.3354 9.29538C23.1125 7.41876 29.0323 4.44253 37.4435 4.44253C42.5535 4.44253 64.1342 1.13116 53.1331 7.5424C50.2983 9.19443 50.2955 8.27138 48.8315 10.126C46.8262 12.6664 50.4638 10.7979 52.7539 10.5906C64.0559 9.56794 73.7862 9.8962 85.2254 9.19443C103.741 8.05852 124.452 10.3149 142.714 7.85015C156.396 6.00349 170.722 6.14857 184.34 4.44244C193.362 3.31199 202.462 1.86114 211.654 1.86114C214.69 1.86114 222.109 0.554059 221.852 3.71968C221.712 5.44573 214.248 7.7148 212.224 8.36602C209.993 9.08402 198.298 12.0831 202.597 12.0831C221.904 12.0831 224.589 11.8486 243.5 9.19443"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
