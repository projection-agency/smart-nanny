"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n/client";
import s from "./VacationForm.module.css";
import { PhoneNumberInput } from "../PhoneInput/PhoneInput";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { closeIco } from "../ModalContext";

const defaultValues = {
  full_name: "",
  country: "",
  birth_date: "",
  phone: "",
  email: "",
  experience: "",
  format: [],
};

export const VacationForm = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const { t } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  const toggleType = (type: string) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const isValidDate = (input: string): boolean => {
    const date = new Date(input);
    return !isNaN(date.getTime());
  };

  const isInPast = (input: string): boolean => {
    const date = new Date(input);
    const now = new Date();
    return date < now;
  };

  const isAtLeastAge = (input: string, minAge: number): boolean => {
    const birthDate = new Date(input);
    const today = new Date();

    const age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    const isBirthdayPassed =
      m > 0 || (m === 0 && today.getDate() >= birthDate.getDate());

    return age > minAge || (age === minAge && isBirthdayPassed);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    let fieldValue: string | string[] = value;
    if (type === "checkbox" && name === "employment") {
      fieldValue = employmentTypes;
    }

    const error = getValidationError(
      name === "employment" ? "format" : name,
      fieldValue
    );
    setErrors((prev) => {
      const updated = { ...prev };
      if (error) updated[name === "employment" ? "format" : name] = error;
      else delete updated[name === "employment" ? "format" : name];
      return updated;
    });
  };

  const formatFormValues = (form: HTMLFormElement) => {
    const full_name = (form[0] as HTMLInputElement).value;
    const country = (form[1] as HTMLInputElement).value;
    const birth_date = (form[2] as HTMLInputElement).value;
    const phone = (form[3] as HTMLInputElement).value;
    const email = (form[4] as HTMLInputElement).value;
    const experience = (form[5] as HTMLInputElement).value;
    const format = [];
    for (let i = 6; i < 10; i++) {
      if ((form[i] as HTMLInputElement).checked) {
        switch (i) {
          case 6:
            format.push("Няня на неповну зайнятість");
            break;
          case 7:
            format.push("Няня з проживанням");
            break;
          case 8:
            format.push("Погодинна допомога");
            break;
          case 9:
            format.push("Няня на повну зайнятість");
            break;
        }
      }
    }
    return {
      full_name,
      country,
      birth_date,
      phone,
      email,
      experience,
      format,
    };
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
      case "birth_date":
        if (!value) return "Вкажіть дату народження";
        else if (!isValidDate(value)) return "Некоректна дата";
        else if (!isInPast(value)) return "Дата не може бути в майбутньому";
        else if (!isAtLeastAge(value, 18)) return "Має бути 18+ років";
        break;
      case "phone":
        if (!value) return "Вкажіть номер телефону";
        else if (value.length < 19) return "Введіть валідний телефон";
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const result = formatFormValues(form);

    const errorsResult = validateForm(
      Object.keys(result),
      Object.values(result)
    );
    setErrors(errorsResult); // встановлюємо всі помилки одразу

    if (Object.keys(errorsResult).length > 0) {
      return; // є помилки — не надсилаємо форму
    }

    try {
      const response = await axios.post(
        "https://www.apismart.projection-learn.website/wp-json/applications/v1/nanny_signup",
        result,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Basic ${btoa("u53R_vLzM2!xT7dp:q9#KpX@81f!cVaZ3")}`,
          },
        }
      );

      console.log(response);
      setIsSubmitted(true);
    } catch (err) {
      const error = err as AxiosError;
      if (error.response && error.response.data) {
        console.log(error.response.data);
      } else {
        console.log("Unknown error", error);
      }
    }
  };
  const handleClose = () => {
    setIsSubmitted(false);
  };

  const employmentLabels = [
    !isReady
      ? typeof translation["vacation_form_employment_part"] === "string"
        ? translation["vacation_form_employment_part"]
        : ""
      : t("vacation_form_employment_part"),
    !isReady
      ? typeof translation["vacation_form_employment_accommodation"] ===
        "string"
        ? translation["vacation_form_employment_accommodation"]
        : ""
      : t("vacation_form_employment_accommodation"),
    !isReady
      ? typeof translation["vacation_form_employment_hourly"] === "string"
        ? translation["vacation_form_employment_hourly"]
        : ""
      : t("vacation_form_employment_hourly"),
    !isReady
      ? typeof translation["vacation_form_employment_full"] === "string"
        ? translation["vacation_form_employment_full"]
        : ""
      : t("vacation_form_employment_full"),
  ];

  return (
    <div className={s.formBlock}>
      {isSubmitted ? (
        <>
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
        </>
      ) : (
        <>
          <h3 className={s.formTitle}>
            {!isReady
              ? typeof translation["vacation_form_form_title"] === "string"
                ? translation["vacation_form_form_title"]
                : ""
              : t("vacation_form_form_title")}
          </h3>
          <form className={s.form} onSubmit={handleSubmit}>
            <div className={s.inputLine}>
              <div className={`${s.inputContainer} ${errors.full_name ? s.error : ""}`}>
                <label>
                  {!isReady
                    ? typeof translation["vacation_form_name_label"] ===
                      "string"
                      ? translation["vacation_form_name_label"]
                      : ""
                    : t("vacation_form_name_label")}
                  <span>*</span>
                  <input
                    placeholder={
                      !isReady
                        ? typeof translation[
                            "vacation_form_name_placeholder"
                          ] === "string"
                          ? translation["vacation_form_name_placeholder"]
                          : ""
                        : t("vacation_form_name_placeholder")
                    }
                    type="text"
                    name="full_name"
                    defaultValue={defaultValues.full_name}
                    onBlur={handleBlur}
                  />
                </label>
              </div>
              <div
                className={`${s.inputContainer} ${
                  errors.country ? s.error : ""
                }`}
              >
                <label>
                  {!isReady
                    ? typeof translation["vacation_form_location_label"] ===
                      "string"
                      ? translation["vacation_form_location_label"]
                      : ""
                    : t("vacation_form_location_label")}
                  <span>*</span>
                  <input
                    placeholder={
                      !isReady
                        ? typeof translation[
                            "vacation_form_location_placeholder"
                          ] === "string"
                          ? translation["vacation_form_location_placeholder"]
                          : ""
                        : t("vacation_form_location_placeholder")
                    }
                    defaultValue={defaultValues.country}
                    type="text"
                    name="country"
                    onBlur={handleBlur}
                  />
                </label>
              </div>
              <div
                className={`${s.inputContainer} ${
                  errors.birth_date ? s.error : ""
                }`}
              >
                <label>
                  {!isReady
                    ? typeof translation["vacation_form_birth_label"] ===
                      "string"
                      ? translation["vacation_form_birth_label"]
                      : ""
                    : t("vacation_form_birth_label")}
                  <span>*</span>
                  <input
                    type="date"
                    name="birth_date"
                    onBlur={handleBlur}
                    defaultValue={defaultValues.birth_date}
                  />
                </label>
              </div>
            </div>

            <div className={s.inputLine}>
              <div
                className={`${s.inputContainer} ${errors.phone ? s.error : ""}`}
              >
                <label>
                  {!isReady
                    ? typeof translation["vacation_form_phone_label"] ===
                      "string"
                      ? translation["vacation_form_phone_label"]
                      : ""
                    : t("vacation_form_phone_label")}
                  <span>*</span>
                  <PhoneNumberInput
                    inputClass={s.input}
                    name="phone"
                    onBlur={handleBlur}
                    // defaultValue={defaultValues.phone}
                  />
                </label>
              </div>
              <div
                className={`${s.inputContainer} ${errors.email ? s.error : ""}`}
              >
                <label>
                  {!isReady
                    ? typeof translation["vacation_form_email_label"] ===
                      "string"
                      ? translation["vacation_form_email_label"]
                      : ""
                    : t("vacation_form_email_label")}
                  <span>*</span>
                  <input
                    type="email"
                    name="email"
                    onBlur={handleBlur}
                    defaultValue={defaultValues.email}
                    placeholder={
                      !isReady
                        ? typeof translation[
                            "vacation_form_email_placeholder"
                          ] === "string"
                          ? translation["vacation_form_email_placeholder"]
                          : ""
                        : t("vacation_form_email_placeholder")
                    }
                  />
                </label>
              </div>
              <div
                className={`${s.inputContainer} ${
                  errors.experience ? s.error : ""
                }`}
              >
                <label>
                  {!isReady
                    ? typeof translation["vacation_form_experience_label"] ===
                      "string"
                      ? translation["vacation_form_experience_label"]
                      : ""
                    : t("vacation_form_experience_label")}
                  <span>*</span>
                  <input
                    defaultValue={defaultValues.phone}
                    name="experience"
                    onBlur={handleBlur}
                    type="number"
                    placeholder={
                      !isReady
                        ? typeof translation[
                            "vacation_form_experience_placeholder"
                          ] === "string"
                          ? translation["vacation_form_experience_placeholder"]
                          : ""
                        : t("vacation_form_experience_placeholder")
                    }
                    min={0}
                  />
                </label>
              </div>
            </div>

            <div
              className={`${s.employmentBlock} ${errors.format ? s.error : ""}`}
            >
              <p>
                {!isReady
                  ? typeof translation["vacation_form_employment_label"] ===
                    "string"
                    ? translation["vacation_form_employment_label"]
                    : ""
                  : t("vacation_form_employment_label")}
                <span>*</span>
              </p>
              <Swiper
                modules={[Pagination]}
                breakpoints={{
                  0: { enabled: true, spaceBetween: 20, slidesPerView: 1.2 },
                  1025: {
                    spaceBetween: 0,
                    enabled: false,
                    slidesPerView: "auto",
                  },
                }}
                spaceBetween={20}
                pagination={{
                  type: "bullets",
                  el: `.${s.paginationCont}`,
                  bulletElement: "p",
                }}
                className={`${s.swiper} swiper`}
              >
                {employmentLabels.map((label, idx) => {
                  const checked = employmentTypes.includes(label);
                  return (
                    <SwiperSlide className={s.swiperSlide} key={idx}>
                      <label key={label} className={s.checkboxItem}>
                        <input
                          type="checkbox"
                          name="employment"
                          checked={checked}
                          onChange={() => toggleType(label)}
                          className={s.hiddenCheckbox}
                          onBlur={handleBlur}
                        />
                        <span className={s.customCheckbox}></span>
                        {label}
                      </label>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className={s.paginationCont}></div>
            </div>

            <button className={s.submitBtn} type="submit">
              {!isReady
                ? typeof translation["vacation_form_submit"] === "string"
                  ? translation["vacation_form_submit"]
                  : ""
                : t("vacation_form_submit")}
            </button>

            <p className={s.note}>
              {!isReady
                ? typeof translation["vacation_form_note"] === "string"
                  ? translation["vacation_form_note"]
                  : ""
                : t("vacation_form_note")}{" "}
              <a href={`/${locale}/policy`}>
                {!isReady
                  ? typeof translation["vacation_form_policy"] === "string"
                    ? translation["vacation_form_policy"]
                    : ""
                  : t("vacation_form_policy")}
              </a>{" "}
              {!isReady
                ? typeof translation["vacation_form_note2"] === "string"
                  ? translation["vacation_form_note2"]
                  : ""
                : t("vacation_form_note2")}
            </p>
          </form>
        </>
      )}
    </div>
  );
};
