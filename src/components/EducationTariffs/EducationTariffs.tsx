import s from "./EducationTariffs.module.css";

type TariffOption = {
  label: string;
  included: boolean;
};

type Tariff = {
  title: string;
  price: number;
  buttonText: string;
  options: TariffOption[];
};

const tariffs: Tariff[] = [
  {
    title: "Базовий",
    price: 2500,
    buttonText: "Обрати навчання",
    options: [
      { label: "Повний доступ до всіх відеоуроків", included: true },
      { label: "Теоретичні матеріали", included: true },
      { label: "Додаткові матеріали після кожного уроку", included: true },
      { label: "Тестування після кожного модуля", included: true },
      { label: "Сертифікат після проходження курсу", included: true },
      { label: "Доступ назавжди", included: false },
      { label: "Зворотний зв'язок від експертів", included: false },
      { label: "Підтримка куратора в Telegram", included: false },
      { label: "Персональні коментарі до тем курсу", included: false },
      {
        label: "Відповіді на запитання під час проходження курсу",
        included: false,
      },
    ],
  },
  {
    title: "Розширений",
    price: 3500,
    buttonText: "Обрати навчання",
    options: [
      { label: "Повний доступ до всіх відеоуроків", included: true },
      { label: "Теоретичні матеріали", included: true },
      { label: "Додаткові матеріали після кожного уроку", included: true },
      { label: "Тестування після кожного модуля", included: true },
      { label: "Сертифікат після проходження курсу", included: true },
      { label: "Доступ назавжди", included: true },
      { label: "Зворотний зв'язок від експертів", included: true },
      { label: "Підтримка куратора в Telegram", included: true },
      { label: "Персональні коментарі до тем курсу", included: true },
      {
        label: "Відповіді на запитання під час проходження курсу",
        included: true,
      },
    ],
  },
];

export const EducationTariffs = () => {
  return (
    <div className={s.tariffs}>
      {tariffs.map((tariff) => (
        <div className={s.tariff} key={tariff.title}>
          <h3>{tariff.title}</h3>
          <ul>
            {tariff.options.map((opt, i) => (
              <li className={!opt.included ? s.grey : ""} key={i}>
                {opt.included ? yes : no} {opt.label}
              </li>
            ))}
          </ul>
          <div className={s.price}>
            <span>Вартість:</span>
            <span>{tariff.price} грн</span>
          </div>
          <button>{tariff.buttonText}</button>
        </div>
      ))}
    </div>
  );
};

const yes = (
  <svg
    width="14"
    height="13"
    viewBox="0 0 14 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g filter="url(#filter0_g_731_6093)">
      <path
        d="M2 7L5.04348 10.5L12 2.5"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_g_731_6093"
        x="0.1"
        y="0.6"
        width="13.8"
        height="11.8"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.18518517911434174 0.18518517911434174"
          numOctaves="3"
          seed="5181"
        />
        <feDisplacementMap
          in="shape"
          scale="1.7999999523162842"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect1_texture_731_6093">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
    </defs>
  </svg>
);

const no = (
  <svg
    width="12"
    height="21"
    viewBox="0 0 12 21"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_740_1697)" filter="url(#filter0_g_740_1697)">
      <path
        d="M10 6L2 14"
        // stroke="#FF91B2"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14L2 6"
        // stroke="#FF91B2"
        stroke="red"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <filter
        id="filter0_g_740_1697"
        x="0.1"
        y="-0.4"
        width="11.8"
        height="21.8"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="BackgroundImageFix"
          result="shape"
        />
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.18518517911434174 0.18518517911434174"
          numOctaves="3"
          seed="5181"
        />
        <feDisplacementMap
          in="shape"
          scale="1.7999999523162842"
          xChannelSelector="R"
          yChannelSelector="G"
          result="displacedImage"
          width="100%"
          height="100%"
        />
        <feMerge result="effect1_texture_740_1697">
          <feMergeNode in="displacedImage" />
        </feMerge>
      </filter>
      <clipPath id="clip0_740_1697">
        <rect
          width="10"
          height="20"
          fill="white"
          transform="translate(1 0.5)"
        />
      </clipPath>
    </defs>
  </svg>
);
