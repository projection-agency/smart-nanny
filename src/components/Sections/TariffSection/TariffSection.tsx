import { EducationTariffs } from "@/components/EducationTariffs/EducationTariffs";
import s from "./TariffSection.module.css";
import Image from "next/image";

export const TariffSection = () => {
  return (
    <section className={s.section}>
      <h2 className={s.title}>
        Тарифи на <span>навчання{line}</span>
      </h2>

      <EducationTariffs />

      <Image
        alt="flower"
        width={1920}
        height={1080}
        priority
        src="/icons/yellow-sun.svg"
        className={s.flower}
      />

      <Image
        alt="sun"
        width={1920}
        height={1080}
        priority
        src="/icons/yellow-flower.svg"
        className={s.sun}
      />

      <Image
        alt="svg"
        width={1920}
        height={1080}
        priority
        src="/icons/noname.svg"
        className={s.svg}
      />
    </section>
  );
};

const line = (
  <svg viewBox="0 0 215 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.5 16C1.99504 12.7275 10.5509 10.5471 13.6202 9.70162C20.4333 7.82501 25.6192 4.84878 32.9877 4.84878C37.4642 4.84878 56.3696 1.53741 46.7323 7.94864C44.249 9.60068 44.2465 8.67763 42.964 10.5323C41.2072 13.0726 44.3939 11.2041 46.4001 10.9969C56.3011 9.97419 64.8251 10.3024 74.8463 9.60068C91.0668 8.46477 109.21 10.7211 125.208 8.2564C137.194 6.40974 149.744 6.55482 161.674 4.84869C169.578 3.71824 177.55 2.26739 185.602 2.26739C188.261 2.26739 194.761 0.96031 194.536 4.12593C194.413 5.85198 187.875 8.12105 186.101 8.77227C184.146 9.49027 173.901 12.4893 177.667 12.4893C194.581 12.4893 196.933 12.2548 213.5 9.60068"
      stroke="#FFF9C1"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
