"use client";

import { useEffect, useRef, useState } from "react";
import { closeIco } from "../ModalContext";
import s from "./EducationPopup.module.css";
import Link from "next/link";
import clsx from "clsx";

export const EducationPopup = ({ onClose }: { onClose: () => void }) => {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

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
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className={clsx(s.popupOverlay, visible && s.visible)}>
      <div
        ref={popupRef}
        className={clsx(s.popupContent, visible && s.visible)}
      >
        <div className={s.closeBtn} onClick={handleClose}>
          {closeIco}
        </div>

        <div className={s.popupTitle}>
          <h3>Залиште заявку на навчання</h3>
          <p>
            Ми зв’яжемося з вами найближчим часом і надамо всі деталі щодо
            проходження курсу
          </p>
        </div>

        <form>
          <div className={s.inputLine}>
            <div className={s.inputContainer}>
              <label>
                Ім’я та прізвище<span>*</span>
                <input placeholder="Імʼя Прізвище" type="text" />
              </label>
            </div>
          </div>

          <div className={s.inputLine}>
            <div className={s.inputContainer}>
              <label>
                Контактний номер телефону<span>*</span>
                <input type="tel" placeholder="+380..." />
              </label>
            </div>
          </div>

          <div className={s.inputLine}>
            <div className={s.inputContainer}>
              <label>
                Email<span>*</span>
                <input type="email" placeholder="youremail@domain.com" />
              </label>
            </div>
          </div>

          <button typeof="submit" className={s.submitBtn}>
            Залишити заявку
          </button>

          <p className={s.note}>
            Натискаючи на кнопку, я погоджуюсь з{" "}
            <Link onClick={onClose} href="/policy">
              Політикою конфіденційності
            </Link>{" "}
            і дозволяю обробку моїх персональних даних для цілей рекрутингу
          </p>
        </form>
      </div>
    </div>
  );
};
