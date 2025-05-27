"use client";

import { Container } from "@/components/Container";
import s from "./RoadSection.module.css";
import { line } from "../HomeHero/HomeHero";
import { btnSvg } from "../BlogSection/BlogSection";
import { useModal } from "@/components/ModalContext";

export const selectionSteps = [
  {
    step: "Етап 1",
    title: "Ретельний відбір кандидатів",
    description:
      "На цьому етапі проводимо фільтрування кандидитатів під час співбесіди з HR на основі їхньої мотивації, готовності працювати з дітьми та відповідності цінностей родині. ",
    needed: [
      "Паспорт",
      "ІПН",
      "Документ про освіту",
      "Медична довідка про придатність",
      "Рекомендації",
    ],
  },
  {
    step: "Етап 2",
    title: "Оцінка знань",
    description:
      "Кандидати проходять тестування знань з догляду, безпеки та розвитку дітей. Це підтверджує, що вони не лише люблять дітей, а й мають відповідні знання.",
    needed: [
      "Оцінка знань із безпеки та догляду",
      "Тренінг з домедичної допомоги",
      "Курс з педагогіки",
      "Знання з догляду та розвитку",
      "Знання з домедичної допомоги",
    ],
  },
  {
    step: "Етап 3",
    title: "Навчання та підготовка",
    description:
      "Кандидати проходять тренінг з домедичної допомоги та професійний курс “Професійна няня”, де отримують практичні знання для роботи з дітьми.",
    needed: [
      "Тест із безпеки та догляду",
      "Тренінг з домедичної допомоги",
      "Курс Професійна няня",
      "Курс з педагогіки",
    ],
  },
  {
    step: "Етап 4",
    title: "Фінальний відбір",
    description:
      "Супроводжуємо няню на всіх етапах роботи: консультуємо, допомагаємо з питаннями та запрошуємо до комʼюніті однодумців, де завжди можна знайти підтримку й натхнення.",
    needed: [
      "Обговорення",
      "Підтримка та натхнення від команди",
      "Ком`юніті однодумців",
    ],
  },
];

export const RoadSection = () => {
  const { openModal } = useModal();

  return (
    <section className={s.section}>
      <Container>
        <div className={s.titleContainer}>
          <h2>
            Як ми відбираємо та <span>готуємо спеціалістів {line}</span>
          </h2>

          <p>
            Ми знаходимо нянь, яким можна довірити найцінніше – вашу дитину.
          </p>
        </div>

        <ul className={s.stepList}>
          {selectionSteps.map((step, index) => (
            <li key={index}>
              <span className={s.step}>
                <span>{step.step}: </span> {stepBg}
              </span>

              <h3>{step.title}</h3>
              <p>{step.description}</p>

              <h4>Що потрібно:</h4>

              <ul>
                {step.needed.map((item, index) => (
                  <li key={index}>
                    {item}
                    {underline}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button onClick={() => openModal("formA")} className={s.btn}>
          <div className={s.first}>{btnSvg}</div>
          Підібрати няню
          <div className={s.second}>{btnSvg}</div>
        </button>
      </Container>
    </section>
  );
};

const stepBg = (
  <svg
    width="126"
    height="48"
    viewBox="0 0 126 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M105.056 45.1743C58.9332 47.049 33.6575 46.303 12.8319 36.8542C0.145139 31.098 -12.457 3.10223 44.0462 2.22396C67.9891 1.85179 85.9821 1.80104 99.8101 3.20899C128.277 6.10747 133.613 44.0135 105.056 45.1743Z"
      fill="#ACE2FF"
      stroke="#ACE2FF"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const underline = (
  <svg viewBox="0 0 151 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M148.23 1.26846H149.889C150.442 1.26846 148.783 1.26219 148.23 1.26846Z"
      fill="#FF91B2"
    />
    <path
      d="M1 3.29047C50.979 -0.0861886 82.8937 1.26846 133.226 1.26846C138.143 1.26846 143.06 1.26846 147.977 1.26846C148.614 1.26846 149.252 1.26846 149.889 1.26846C150.442 1.26846 148.783 1.26219 148.23 1.26846C142.66 1.3317 134.11 1.59304 128.56 1.84639C62.095 4.88025 106.257 2.76562 39.0052 4.49689"
      stroke="#FF91B2"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
