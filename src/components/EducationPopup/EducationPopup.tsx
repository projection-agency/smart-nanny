"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { closeIco } from "../ModalContext";
import s from "./EducationPopup.module.css";
import Link from "next/link";
import clsx from "clsx";
import { PhoneNumberInput } from "../PhoneInput/PhoneInput";
import { PASS } from "@/constants";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/client";

export function EducationPopup({
  translation,
  locale,
  onClose,
}: {
  translation: Record<string, unknown>;
  locale: string;
  onClose: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = fullName.trim() && phone.trim() && email.trim();

  const validateValue = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "full_name":
        if (!value.trim()) error = "Вкажіть ім'я";
        break;
      case "email":
        if (!value.trim()) error = "Вкажіть email";
        break;
      case "phone":
        if (!value) error = "Вкажіть номер телефону";
        else if (value.length < 12) error = "Введіть валідний телефон";
        break;
      case "location":
        if (!value.trim()) error = "Вкажіть вашу локацію";
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    validateValue(name, value);
  };

  const getValidationError = (
    name: string,
    value: string | string[]
  ): string => {
    if (name === "format" && Array.isArray(value)) {
      if (value.length === 0) return "Оберіть хоча б один формат зайнятості";
      return "";
    }

    if (typeof value !== "string") return "";

    switch (name) {
      case "full_name":
        if (!value.trim()) return "Вкажіть ваше ім'я";
        break;
      case "country":
        if (!value.trim()) return "Вкажіть ваше місце проживання";
        break;
      case "phone":
        if (!value) return "Вкажіть номер телефону";
        else if (value.length < 12) return "Введіть валідний телефон";
        break;
      case "email":
        if (!value) return "Вкажіть Email";
        break;
      case "experience":
        if (!value) return "Вкажіть ваш досвід";
        break;
    }
    return "";
  };

  const validateForm = (
    keys: string[],
    values: (string | string[])[]
  ): Record<string, string> => {
    const newErrors: Record<string, string> = {};

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = values[i];
      const error = getValidationError(key, value);
      if (error) newErrors[key] = error;
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      full_name: fullName,
      phone,
      email,
    };

    const localErrors = validateForm(
      Object.keys(payload),
      Object.values(payload)
    );

    const hasAnyKeys = Object.keys(localErrors).length > 0;
    if (hasAnyKeys) {
      console.log("error");
      return;
    }

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
      setIsSubmitted(true);
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

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

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
              <h3>
                {!isReady
                  ? (translation &&
                      (translation[
                        "education_popup_success_title"
                      ] as string)) ||
                    ""
                  : t("education_popup_success_title")}
              </h3>
              <p>
                {!isReady
                  ? (translation &&
                      (translation[
                        "education_popup_success_text"
                      ] as string)) ||
                    ""
                  : t("education_popup_success_text")}
              </p>
            </div>
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
            <h3>
              {!isReady
                ? (translation &&
                    (translation["education_popup_title"] as string)) ||
                  ""
                : t("education_popup_title")}
            </h3>
            <p>
              {!isReady
                ? (translation &&
                    (translation["education_popup_subtitle"] as string)) ||
                  ""
                : t("education_popup_subtitle")}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={s.inputLine}>
              <div className={s.inputContainer}>
                <label>
                  {!isReady
                    ? (translation &&
                        (translation[
                          "education_popup_name_label"
                        ] as string)) ||
                      ""
                    : t("education_popup_name_label")}
                  <span>*</span>
                  <input
                    type="text"
                    placeholder={
                      !isReady
                        ? (translation &&
                            (translation[
                              "education_popup_name_placeholder"
                            ] as string)) ||
                          ""
                        : t("education_popup_name_placeholder")
                    }
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={handleBlur}
                    name="full_name"
                    className={clsx({
                      [s.error]: errors.full_name,
                    })}
                  />
                </label>
              </div>
            </div>

            <div className={s.inputLine}>
              <div className={s.inputContainer}>
                <label>
                  {!isReady
                    ? (translation &&
                        (translation[
                          "education_popup_phone_label"
                        ] as string)) ||
                      ""
                    : t("education_popup_phone_label")}
                  <span>*</span>
                  <PhoneNumberInput
                    className={clsx({
                      ["error"]: errors.phone,
                    })}
                    value={phone}
                    onChange={(val) => setPhone(val)}
                    onBlur={handleBlur}
                    name="phone"
                  />
                </label>
              </div>
            </div>

            <div className={s.inputLine}>
              <div className={s.inputContainer}>
                <label>
                  {!isReady
                    ? (translation &&
                        (translation[
                          "education_popup_email_label"
                        ] as string)) ||
                      ""
                    : t("education_popup_email_label")}
                  <span>*</span>
                  <input
                    type="email"
                    placeholder={
                      !isReady
                        ? (translation &&
                            (translation[
                              "education_popup_email_placeholder"
                            ] as string)) ||
                          ""
                        : t("education_popup_email_placeholder")
                    }
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    onBlur={handleBlur}
                    className={clsx({
                      [s.error]: errors.email,
                    })}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={clsx(s.submitBtn, { [s.disabled]: !isValid })}
            >
              {!isReady
                ? (translation &&
                    (translation["education_popup_submit"] as string)) ||
                  ""
                : t("education_popup_submit")}
            </button>

            <p className={s.note}>
              {!isReady
                ? (translation &&
                    (translation["education_popup_note"] as string)) ||
                  ""
                : t("education_popup_note")}{" "}
              <Link onClick={onClose} href="/policy">
                {!isReady
                  ? (translation &&
                      (translation["education_popup_policy"] as string)) ||
                    ""
                  : t("education_popup_policy")}
              </Link>{" "}
              {!isReady
                ? (translation &&
                    (translation["education_popup_note2"] as string)) ||
                  ""
                : t("education_popup_note2")}
            </p>
          </form>
        </div>
      )}
    </div>
  );
}
