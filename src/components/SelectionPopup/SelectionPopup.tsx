"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { closeIco } from "../ModalContext";
import s from "./SelectionPopup.module.css";
import Link from "next/link";
import clsx from "clsx";
import { PhoneNumberInput } from "../PhoneInput/PhoneInput";
import { PASS } from "@/constants";
import Image from "next/image";

export const SelectionPopup = ({ onClose }: { onClose: () => void }) => {
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isValid =
    fullName.trim() &&
    phone.trim() &&
    email.trim() &&
    location.trim() &&
    employmentTypes.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    if (!isValid) return;

    const payload = {
      full_name: fullName,
      phone,
      email,
      location,
      format: employmentTypes,
    };

    try {
      const response = await fetch(
        "https://www.apismart.projection-learn.website/wp-json/applications/v1/nanny_match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Basic " + btoa(PASS),
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        setIsSubmitted(true);

        // handleClose();
      }
    } catch (error) {
      console.error("Send error:", error);
    }
  };

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

  const toggleType = (type: string) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [type]
    );
  };

  return (
    <div className={clsx(s.popupOverlay, visible && s.visible)}>
      {isSubmitted ? (
        <div
          ref={popupRef}
          className={clsx(s.popupContent, visible && s.visible)}
        >
          <div className={s.closeBtn} onClick={handleClose}>
            {closeIco}
          </div>

          <div className={s.confirmation}>
            <div>
              <Image
                src={"/icons/confirmation.svg"}
                alt="confirmation"
                width={48}
                height={48}
              />
              <h3>Дякуємо за заявку!</h3>
              <p>Менеджер зв&apos;яжеться з вами для уточнення деталей :)</p>
            </div>
            <button onClick={() => handleClose()} className={s.submitBtn}>
              Залишити заявку
            </button>
          </div>
        </div>
      ) : (
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
              Ми зв&apos;яжемося з вами найближчим часом щодо підбору няні для
              вашої дитини
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={s.inputLine}>
              <div className={s.inputContainer}>
                <label>
                  Ім&apos;я та прізвище<span>*</span>
                  <input
                    className={clsx({
                      [s.error]: isSubmitted && !fullName.trim(),
                    })}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Ім'я Прізвище"
                    type="text"
                  />
                </label>
              </div>

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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="youremail@domain.com"
                    className={clsx({
                      [s.error]: isSubmitted && !email.trim(),
                    })}
                  />
                </label>
              </div>

              <div className={s.inputContainer}>
                <label>
                  Країна та місто проживання<span>*</span>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Київ, Україна"
                    type="text"
                    className={clsx({
                      [s.error]: isSubmitted && !location.trim(),
                    })}
                  />
                </label>
              </div>
            </div>

            <div className={s.employmentBlock}>
              <p>
                Формат зайнятості, який вас цікавить<span>*</span>
              </p>
              <div
                className={clsx(s.checkboxGrid, {
                  [s.error]: isSubmitted && employmentTypes.length === 0,
                })}
              >
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

            <button
              // disabled={!isValid}
              typeof="submit"
              className={`${s.submitBtn} ${!isValid && s.disabled}`}
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
      )}
    </div>
  );
};
