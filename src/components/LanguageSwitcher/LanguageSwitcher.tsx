"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import s from "./LanguageSwitcher.module.css";

const languages = ["EN", "DE"];

export const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState("UA");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLang = localStorage.getItem("lang");
      if (savedLang) setCurrentLang(savedLang);
    }
  }, []);

  const toggle = () => setOpen((prev) => !prev);

  const selectLang = (lang: string) => {
    setCurrentLang(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    setOpen(false);
  };

  return (
    <motion.div
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={s.container}
      style={{
        borderRadius: open ? "1.5vw" : "86vw",
        // transform: open ? "translateY(2vw)" : "",
      }}
    >
      <div className={s.topRow} onClick={toggle}>
        <span>{currentLang}</span>
        <span className={s.arrow}>
          <svg
            className={`${s.arrowIcon} ${open ? s.rotate : ""}`}
            viewBox="0 0 16 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.209 3.22266C14.3504 3.47732 14.3269 3.81457 14.1387 4.04199L8.52148 10.8281V10.8271C8.48156 10.8777 8.32642 11.0606 8.0625 11.0869H7.93164C7.8088 11.0728 7.70937 11.0229 7.63965 10.9756C7.5544 10.9178 7.50043 10.8532 7.47949 10.8271L7.47852 10.8281L1.86133 4.04199V4.04102C1.67419 3.81375 1.64946 3.47879 1.79102 3.22363L1.86133 3.11914C1.97541 2.98141 2.13878 2.89955 2.31543 2.89941C2.49227 2.89941 2.65633 2.98127 2.77051 3.11914L7.90039 9.31641L7.96875 9.39941V9.49121L7.98438 9.49023L8 9.49121V9.4375L8.06934 9.35352L13.2305 3.11914C13.3446 2.98147 13.5079 2.89941 13.6846 2.89941C13.8613 2.89948 14.0245 2.9814 14.1387 3.11914L14.209 3.22266Z"
              fill="#FF91B2"
              stroke="#FF91B2"
              strokeWidth="0.6"
            />
          </svg>
        </span>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={s.dropdownContent}
          >
            <div className={s.divider} />
            <div className={s.langList}>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => selectLang(lang)}
                  className={s.langButton}
                >
                  {lang}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
