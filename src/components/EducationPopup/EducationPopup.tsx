"use client";

import { useEffect, useRef, useState } from "react";
import { closeIco } from "../ModalContext";
import s from "./EducationPopup.module.css";
import Link from "next/link";
import clsx from "clsx";
import { PhoneNumberInput } from "../PhoneInput/PhoneInput";
import { PASS } from "@/constants";

export const EducationPopup = ({ onClose }: { onClose: () => void }) => {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValid = fullName.trim() && phone.trim() && email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isValid) return;

    const payload = {
      full_name: fullName,
      phone,
      email,
    };

    try {
      const response = await fetch(
        "https://www.apismart.projection-learn.website/wp-json/applications/v1/training",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(PASS),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) throw new Error("Помилка при надсиланні форми");

      handleClose();
    } catch (error) {
      console.error("Send error:", error);
    }
  };

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 300);
  };

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
            Ми зв'яжемося з вами найближчим часом і надамо всі деталі щодо
            проходження курсу
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={s.inputLine}>
            <div className={s.inputContainer}>
              <label>
                Ім'я та прізвище<span>*</span>
                <input
                  type="text"
                  placeholder="Імʼя Прізвище"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={clsx({
                    [s.error]: isSubmitted && !fullName.trim(),
                  })}
                />
              </label>
            </div>
          </div>

          <div className={s.inputLine}>
            <div className={s.inputContainer}>
              <label>
                Контактний номер телефону<span>*</span>
                <PhoneNumberInput
                  className={clsx({
                    ["error"]: isSubmitted && !phone.trim(),
                  })}
                  value={phone}
                  onChange={(val) => setPhone(val)}
                />
              </label>
            </div>
          </div>

          <div className={s.inputLine}>
            <div className={s.inputContainer}>
              <label>
                Email<span>*</span>
                <input
                  type="email"
                  placeholder="youremail@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={clsx({ [s.error]: isSubmitted && !email.trim() })}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className={clsx(s.submitBtn, { [s.disabled]: !isValid })}
          >
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
