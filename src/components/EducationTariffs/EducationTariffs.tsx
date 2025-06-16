"use client";

import { useEffect, useState } from "react";
import { useModal } from "../ModalContext";
import s from "./EducationTariffs.module.css";
import { API_URL } from "@/constants";
import { useTranslation } from 'react-i18next';

type TariffOption = {
  label: string;
  included: boolean;
};

type Tariff = {
  id: number;
  title: string;
  price: string;
  options: TariffOption[];
  buttonText: string;
};

type ApiTariff = {
  id: number;
  title: { rendered: string };
  Price: string;
  Tariff: { Status: string; Text: string }[];
};

export const EducationTariffs = () => {
  const { openModal } = useModal();
  const { t, i18n } = useTranslation('common');
  const [tariffs, setTariffs] = useState<Tariff[]>([]);
  useEffect(() => {
    const lang = (i18n.language === 'ua' ? 'ua' : i18n.language).toLowerCase();
    const fetchTariffs = async () => {
      try {
        const response = await fetch(`${API_URL}v2/course_tariff?lang=${lang}`);
        const data: ApiTariff[] = await response.json();

        const parsedTariffs: Tariff[] = data.map((item) => ({
          id: item.id,
          title: item.title?.rendered || "",
          price: item.Price,
          buttonText: t('tariff_btn'),
          options:
            item.Tariff?.map((opt) => ({
              label: opt.Text,
              included: opt.Status === "+",
            })) || [],
        }));

        // Сортування — "Базовий" першим (ua) або "Basic" (en)
        parsedTariffs.sort((a, b) => {
          if (a.title === t('tariff_basic')) return -1;
          if (b.title === t('tariff_basic')) return 1;
          return 0;
        });

        setTariffs(parsedTariffs);
      } catch (error) {
        console.error("Помилка при отриманні тарифів:", error);
      }
    };

    fetchTariffs();
  }, [i18n.language, t]);

  return (
    <div className={s.tariffs}>
      {tariffs.map((tariff) => (
        <div className={s.tariff} key={tariff.id}>
          <h3>{tariff.title}</h3>
          <ul>
            {tariff.options.map((opt, i) => {
              // Витягуємо текст у дужках, якщо є
              const match = opt.label.match(/^(.*?)(\s*\((.*?)\))?$/);
              const mainText = match ? match[1].trim() : opt.label;
              const secondaryText = match && match[3] ? match[3] : null;
              return (
                <li className={!opt.included ? s.grey : ""} key={i}>
                  {opt.included ? yes : no}
                  <div className={s.optionTextWrapper}>
                    <span className={s.optionMain}>{mainText}</span>
                    {secondaryText && (
                      <span className={s.optionSecondary}>({secondaryText})</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={s.price}>
            <span>{t('tariff_price')}:</span>
            <span>{tariff.price}</span>
          </div>
          <button onClick={() => openModal("formB")}>{tariff.buttonText}</button>
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
