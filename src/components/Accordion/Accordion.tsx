"use client";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./Accordion.module.css";

interface AccordionProps {
  id: number;
  title: string;
  isOpen: boolean;
  onToggle: (id: number) => void;
  children: React.ReactNode;
}

export const Accordion = ({
  id,
  title,
  isOpen,
  onToggle,
  children,
}: AccordionProps) => {
  return (
    <div className={styles.accordion}>
      <button className={styles.header} onClick={() => onToggle(id)}>
        <span className={styles.title}>{title}</span>
        <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>
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
            className={styles.contentWrapper}
          >
            <div className={styles.content}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
