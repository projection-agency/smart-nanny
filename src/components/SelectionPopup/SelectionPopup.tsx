"use client";

import { useEffect, useRef, useState } from "react";
import { closeIco } from "../ModalContext";
import s from "./SelectionPopup.module.css";
import Link from "next/link";
import clsx from "clsx";
import { PhoneNumberInput } from "../PhoneInput/PhoneInput";

export const SelectionPopup = ({ onClose }: { onClose: () => void }) => {
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // запуск анімації після маунта
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

  const toggleType = (type: string) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300); // синхронізовано з анімацією
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
          <h3>Залиште заявку на підбір няні</h3>
          <p>
            Ми зв’яжемося з вами найближчим часом щодо підбору няні для вашої
            дитини
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

            <div className={s.inputContainer}>
              <label>
                Контактний номер телефону<span>*</span>
                <PhoneNumberInput />
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

            <div className={s.inputContainer}>
              <label>
                Країна та місто проживання<span>*</span>
                <input placeholder="Київ, Україна" type="text" />
              </label>
            </div>
          </div>

          <div className={s.employmentBlock}>
            <p>
              Формат зайнятості, який вас цікавить<span>*</span>
            </p>
            <div className={s.checkboxGrid}>
              {[
                "Няня на повну зайнятість",
                "Няня з частковою зайнятістю",
                "Погодинна допомога",
                "Робота з проживанням",
              ].map((label) => {
                const checked = employmentTypes.includes(label);

                return (
                  <label key={label} className={s.checkboxItem}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleType(label)}
                      className={s.hiddenCheckbox}
                    />
                    <span className={s.customCheckbox}></span>
                    {label}
                  </label>
                );
              })}
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
