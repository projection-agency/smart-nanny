"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { closeIco } from "../ModalContext";
import s from "./RespondPopup.module.css";
import Link from "next/link";
import clsx from "clsx";
import { PhoneNumberInput } from "../PhoneInput/PhoneInput";
import { PASS } from "@/constants";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/client';

export function RespondPopup({ translation, locale, onClose }: { translation: Record<string, unknown>, locale: string, onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { t } = useTranslation('common');
  const [isReady, setIsReady] = useState(false);

  const isValid = fullName.trim() && phone.trim() && email.trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
      i18n.addResourceBundle(locale, 'common', translation, true, true);
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
              <h3>{!isReady ? (translation && translation['education_popup_success_title'] as string) || '' : t('education_popup_success_title')}</h3>
              <p>{!isReady ? (translation && translation['education_popup_success_text'] as string) || '' : t('education_popup_success_text')}</p>
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
            <h3>{!isReady ? (translation && translation['respond_popup_title'] as string) || '' : t('respond_popup_title')}</h3>
            <p>{!isReady ? (translation && translation['education_popup_subtitle'] as string) || '' : t('education_popup_subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={s.inputLine}>
              <div className={s.inputContainer}>
                <label>
                  {!isReady ? (translation && translation['education_popup_name_label'] as string) || '' : t('education_popup_name_label')}<span>*</span>
                  <input
                    type="text"
                    placeholder={!isReady ? (translation && translation['education_popup_name_placeholder'] as string) || '' : t('education_popup_name_placeholder')}
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
                  {!isReady ? (translation && translation['education_popup_phone_label'] as string) || '' : t('education_popup_phone_label')}<span>*</span>
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
                  {!isReady ? (translation && translation['education_popup_email_label'] as string) || '' : t('education_popup_email_label')}<span>*</span>
                  <input
                    type="email"
                    placeholder={!isReady ? (translation && translation['education_popup_email_placeholder'] as string) || '' : t('education_popup_email_placeholder')}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={clsx({
                      [s.error]: isSubmitted && !email.trim(),
                    })}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className={clsx(s.submitBtn, { [s.disabled]: !isValid })}
            >
              {!isReady ? (translation && translation['education_popup_submit'] as string) || '' : t('education_popup_submit')}
            </button>

            <p className={s.note}>
              {!isReady ? (translation && translation['education_popup_note'] as string) || '' : t('education_popup_note')} {" "}
              <Link onClick={onClose} href="/policy">
                {!isReady ? (translation && translation['education_popup_policy'] as string) || '' : t('education_popup_policy')}
              </Link>{" "}
              {!isReady ? (translation && translation['education_popup_note2'] as string) || '' : t('education_popup_note2')}
            </p>
          </form>
        </div>
      )}
    </div>
  );
}

