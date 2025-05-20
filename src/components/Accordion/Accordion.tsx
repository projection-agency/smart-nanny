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
    <div
      className={`${s.accordion} ${faq && s.faqStyle}`}
      onClick={() => onToggle(id)}
    >
      <button className={s.header}>
        <span className={s.title}>{title}</span>
        <span className={`${s.icon} ${isOpen ? s.open : ""}`}>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path
              d="M1 1L5 5L9 1"
              stroke="#333"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
    </div>
  );
};
