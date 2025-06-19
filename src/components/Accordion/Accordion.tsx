"use client";

import { motion, AnimatePresence } from "framer-motion";
import s from "./Accordion.module.css";

interface AccordionProps {
  faq?: boolean;
  id: number;
  title: string;
  isOpen: boolean;
  onToggle: (id: number) => void;
  children: React.ReactNode;
}

export const Accordion = ({
  faq,
  id,
  title,
  isOpen,
  onToggle,
  children,
}: AccordionProps) => {
  return (
    <motion.div
      className={`${s.accordion} ${faq && s.faqStyle}`}
      onClick={() => onToggle(id)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <button className={s.header}>
        <span className={s.title}>{title}</span>
        <span className={`${s.icon} ${isOpen ? s.open : ""}`}>
          {/* <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1L5 5L9 1"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg> */}
          {corner}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={s.contentWrapper}
          >
            <div className={s.content}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const corner = (
  <svg
    width="22"
    height="15"
    viewBox="0 0 22 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20.9756 1.28809C21.325 1.71021 21.325 2.36499 20.9756 2.78711L11.8564 13.8027L11.7822 13.8896C11.6691 14.0097 11.4397 14.2027 11.1006 14.2363C10.8025 14.2658 10.5651 14.1571 10.4141 14.0547C10.2764 13.9613 10.1887 13.8572 10.1543 13.8145L10.1533 13.8154L1.02539 2.78711L1.02441 2.78613C0.676882 2.36408 0.674134 1.71242 1.02539 1.28809C1.21092 1.06421 1.47643 0.930664 1.76367 0.930664C2.05093 0.930782 2.31649 1.06409 2.50195 1.28809L10.8379 11.3584L10.9492 11.4941V11.6426L10.9746 11.6406L11.001 11.6426V11.5547L11.1123 11.4189L19.499 1.28809C19.6846 1.06414 19.95 0.930664 20.2373 0.930664C20.5246 0.930731 20.7901 1.06407 20.9756 1.28809Z"
      fill="#333333"
      stroke="#333333"
      stroke-width="0.975"
    />
  </svg>
);
