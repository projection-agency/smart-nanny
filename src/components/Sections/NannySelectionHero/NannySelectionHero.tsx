"use client";

import { useModal } from "@/components/ModalContext";
import { btnSvg } from "../BlogSection/BlogSection";
import s from "./NannySelectionHero.module.css";
import Image from "next/image";

export const NannySelectionHero = () => {
  const { openModal } = useModal();

  return (
    <section className={s.section}>
      <div className={s.homeHeroImage}>
        <Image
          src="/images/nanny-hero.png"
          alt="Hero image"
          width={1920}
          height={1080}
          priority
        />
      </div>

      <div className={s.content}>
        <h1>
          <span>Разом {line} </span>до нових можливостей
        </h1>

        <p>
          Ми команда, що об’єднує нянь для професійного зростання. Ми працюємо з
          перевіреними родинами, створюємо дружню спільноту та підтримуємо
          стабільний дохід
        </p>

        <button onClick={() => openModal("formB")} className={s.btn}>
          <div className={s.first}>{btnSvg}</div>
          Подати заявку
          <div className={s.second}>{btnSvg}</div>
        </button>

        <Image
          src="/images/pinkCloud1.png"
          alt="cloud"
          width={1920}
          height={1080}
          priority
          className={s.cloud1}
        />
        <Image
          src="/images/pinkCloud2.png"
          alt="cloud"
          width={1920}
          height={1080}
          priority
          className={s.cloud2}
        />
        <Image
          src="/images/pinkCloud3.png"
          alt="cloud"
          width={1920}
          height={1080}
          priority
          className={s.cloud3}
        />
      </div>
    </section>
  );
};

export const line = (
  <svg viewBox="0 0 189 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.50002 21C1.73154 17.7797 5.73297 15.6341 7.16846 14.8022C10.3548 12.9555 12.7801 10.0268 16.2263 10.0268C18.3199 10.0268 27.1616 6.76828 22.6544 13.0772C21.493 14.7028 21.4918 13.7945 20.892 15.6195C20.0704 18.1193 21.5608 16.2807 22.499 16.0768C27.1295 15.0704 31.1161 15.3934 35.8028 14.7028C43.3889 13.5851 51.874 15.8054 59.3561 13.38C64.9619 11.5628 70.8313 11.7056 76.4104 10.0267C80.1071 8.9143 83.8354 7.48661 87.6012 7.48661C88.8451 7.48661 91.8849 6.20039 91.7795 9.31548C91.722 11.014 88.6642 13.2468 87.835 13.8876C86.9206 14.5942 82.1292 17.5454 83.8904 17.5454C91.8009 17.5454 99.1668 14.6705 106.915 12.0588C113.556 9.82022 120.271 5.65774 127.017 5.65774C134.925 5.65774 142.465 3.82887 150.421 3.82887C153.448 3.82887 155.944 1.92642 155.944 7.94382C155.944 9.93846 155.816 12.0954 155.301 13.8876C155.052 14.7552 152.89 18.646 153.314 16.9866C154.625 11.8571 160.125 11.6712 162.781 10.0267C166.79 7.54401 171.416 5.91747 175.637 4.7433C179.553 3.65395 183.511 2 187.5 2"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
