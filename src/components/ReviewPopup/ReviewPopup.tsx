"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { closeIco } from "../ModalContext";
import s from "./ReviewPopup.module.css";
import clsx from "clsx";
// import { useTranslation } from "react-i18next";
// import i18n from "@/i18n/client";

export function ReviewPopup({
  onClose,
  payload,
}: {
  onClose: () => void;
  payload: string;
}) {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // const { t } = useTranslation("common");
  // const [isReady, setIsReady] = useState(false);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(onClose, 300);
  }, [onClose]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 10);

    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClose]);

  // useEffect(() => {
  //   if (translation && locale) {
  //     i18n.addResourceBundle(locale, "common", translation, true, true);
  //     i18n.changeLanguage(locale).then(() => setIsReady(true));
  //   }
  // }, [translation, locale]);

  return (
    <div className={clsx(s.popupOverlay, visible && s.visible)}>
      <div
        ref={popupRef}
        className={clsx(s.popupContent, visible && s.visible)}
      >
        <div className={s.closeBtn} onClick={handleClose}>
          {closeIco}
        </div>
        <p className={s.text}>{payload}</p>
      </div>
    </div>
  );
}
