"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { closeIco } from "../ModalContext";
import s from "./SelectionPopup.module.css";
import Link from "next/link";
import clsx from "clsx";
import { PhoneNumberInput } from "../PhoneInput/PhoneInput";
import { PASS } from "@/constants";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/client';

export const SelectionPopup = ({ onClose, translation, locale }: { onClose: () => void, translation: Record<string, unknown>, locale: string }) => {
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

  const { t } = useTranslation('common');
  const [isReady, setIsReady] = useState(false);

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

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, 'common', translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

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
              <h3>{!isReady ? (translation && translation['selection_popup_success_title'] as string) || '' : t('selection_popup_success_title')}</h3>
              <p>{!isReady ? (translation && translation['selection_popup_success_text'] as string) || '' : t('selection_popup_success_text')}</p>
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
            <h3>{!isReady ? (translation && translation['selection_popup_title'] as string) || '' : t('selection_popup_title')}</h3>
            <p>{!isReady ? (translation && translation['selection_popup_subtitle'] as string) || '' : t('selection_popup_subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className={s.inputLine}>
              <div className={s.inputContainer}>
                <label>
                  {!isReady ? (translation && translation['selection_popup_name_label'] as string) || '' : t('selection_popup_name_label')}<span>*</span>
                  <input
                    className={clsx({
                      [s.error]: isSubmitted && !fullName.trim(),
                    })}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={!isReady ? (translation && translation['selection_popup_name_placeholder'] as string) || '' : t('selection_popup_name_placeholder')}
                    type="text"
                  />
                </label>
              </div>

              <div className={s.inputContainer}>
                <label>
                  {!isReady ? (translation && translation['selection_popup_phone_label'] as string) || '' : t('selection_popup_phone_label')}<span>*</span>
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
                  {!isReady ? (translation && translation['selection_popup_email_label'] as string) || '' : t('selection_popup_email_label')}<span>*</span>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder={!isReady ? (translation && translation['selection_popup_email_placeholder'] as string) || '' : t('selection_popup_email_placeholder')}
                    className={clsx({
                      [s.error]: isSubmitted && !email.trim(),
                    })}
                  />
                </label>
              </div>

              <div className={s.inputContainer}>
                <label>
                  {!isReady ? (translation && translation['selection_popup_location_label'] as string) || '' : t('selection_popup_location_label')}<span>*</span>
                  <input
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder={!isReady ? (translation && translation['selection_popup_location_placeholder'] as string) || '' : t('selection_popup_location_placeholder')}
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
                {!isReady ? (translation && translation['selection_popup_employment_label'] as string) || '' : t('selection_popup_employment_label')}<span>*</span>
              </p>
              <div
                className={clsx(s.checkboxGrid, {
                  [s.error]: isSubmitted && employmentTypes.length === 0,
                })}
              >
                {[
                  !isReady ? (translation && translation['selection_popup_employment_full'] as string) || '' : t('selection_popup_employment_full'),
                  !isReady ? (translation && translation['selection_popup_employment_part'] as string) || '' : t('selection_popup_employment_part'),
                  !isReady ? (translation && translation['selection_popup_employment_hourly'] as string) || '' : t('selection_popup_employment_hourly'),
                  !isReady ? (translation && translation['selection_popup_employment_accommodation'] as string) || '' : t('selection_popup_employment_accommodation'),
                ].map((label: string) => {
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
              {!isReady ? (translation && translation['selection_popup_submit'] as string) || '' : t('selection_popup_submit')}
            </button>

            <p className={s.note}>
              {!isReady ? (translation && translation['selection_popup_note'] as string) || '' : t('selection_popup_note')} {" "}
              <Link onClick={onClose} href="/policy">
                {!isReady ? (translation && translation['selection_popup_policy'] as string) || '' : t('selection_popup_policy')}
              </Link>{" "}
              {!isReady ? (translation && translation['selection_popup_note2'] as string) || '' : t('selection_popup_note2')}
            </p>
          </form>
        </div>
      )}
    </div>
  );
};
