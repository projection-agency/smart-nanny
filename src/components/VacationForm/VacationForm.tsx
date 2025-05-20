"use client";

import { useState } from "react";
import s from "./VacationForm.module.css";

export const VacationForm = () => {
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);

  const toggleType = (type: string) => {
    setEmploymentTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  return (
    <div className={s.formBlock}>
      <h3 className={s.formTitle}>
        Заповни коротку анкету — ми переглянемо твою заявку і зв’яжемося
        найближчим часом
      </h3>

      <form className={s.form}>
        <div className={s.inputLine}>
          <div className={s.inputContainer}>
            <label>
              Ім’я та прізвище<span>*</span>
              <input placeholder="Імʼя Прізвище" type="text" />
            </label>
          </div>
          <div className={s.inputContainer}>
            <label>
              Країна та місто проживання<span>*</span>
              <input placeholder="Київ, Україна" type="text" />
            </label>
          </div>
          <div className={s.inputContainer}>
            <label>
              Дата народження<span>*</span>
              <input type="date" />
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
          <div className={s.inputContainer}>
            <label>
              Email<span>*</span>
              <input type="email" placeholder="youremail@domain.com" />
            </label>
          </div>
          <div className={s.inputContainer}>
            <label>
              Досвід роботи нянею<span>*</span>
              <input type="number" placeholder="0" min={0} />
            </label>
          </div>
        </div>

        <div className={s.employmentBlock}>
          <p>
            Формат зайнятості, який вас цікавить<span>*</span>
          </p>
          <div className={s.checkboxGrid}>
            {[
              "Часткова зайнятість",
              "Робота з проживанням",
              "Погодинна допомога",
              "Повна зайнятість",
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

        <button className={s.submitBtn} type="button">
          Залишити заявку
        </button>

        <p className={s.note}>
          Натискаючи на кнопку, я погоджуюсь з{" "}
          <a href="#">Політикою конфіденційності</a> і дозволяю обробку моїх
          персональних даних для цілей рекрутингу
        </p>
      </form>
    </div>
  );
};
