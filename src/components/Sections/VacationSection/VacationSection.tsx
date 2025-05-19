"use client";

import { Container } from "@/components/Container";
import s from "./VacationSection.module.css";
import { Dropdown } from "@/components/Dropdown/Dropdown";
import Link from "next/link";
import Image from "next/image";
import { VacationItem } from "@/components/VacationItem/VacationItem";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { arrow } from "../GallerySection/GallerySection";
import { useEffect, useRef } from "react";

export const nanniesData = [
  {
    title: "Няня для хлопчика",
    price: "20000-35000 грн",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-ПТ, повна зайнятість",
    description:
      "Шукаємо турботливу, відповідальну няню для дитини віком 2 років. Родина проживає в Києві, потрібна няня з досвідом і любов’ю до дітей. Графік повний, оплата гідна.",
  },
  {
    title: "Няня для хлопчика",
    price: "Від 400 грн/год",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-ПТ, неповна зайнятість",
    description:
      "Шукаємо турботливу, відповідальну няню для дитини віком 2 років. Родина проживає в Києві, потрібна гнучка зайнятість. Няня має бути активною, пунктуальною, з досвідом.",
  },
  {
    title: "Няня для хлопчика зі знанням англійської",
    price: "20000-35000 грн",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-СР, повна зайнятість",
    description:
      "Шукаємо турботливу няню зі знанням англійської для хлопчика 2 років. Важливо вміти проводити активний час з дитиною, гратись, читати, займатись розвитком.",
  },
  {
    title: "Няня для хлопчика",
    price: "20000-35000 грн",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-ПТ, повна зайнятість",
    description:
      "Шукаємо турботливу, відповідальну няню для дитини віком 2 років. Родина проживає в Києві, потрібна няня з досвідом і любов’ю до дітей. Графік повний, оплата гідна.",
  },
  {
    title: "Няня для хлопчика",
    price: "Від 400 грн/год",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-ПТ, неповна зайнятість",
    description:
      "Шукаємо турботливу, відповідальну няню для дитини віком 2 років. Родина проживає в Києві, потрібна гнучка зайнятість. Няня має бути активною, пунктуальною, з досвідом.",
  },
  {
    title: "Няня для хлопчика зі знанням англійської",
    price: "20000-35000 грн",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-СР, повна зайнятість",
    description:
      "Шукаємо турботливу няню зі знанням англійської для хлопчика 2 років. Важливо вміти проводити активний час з дитиною, гратись, читати, займатись розвитком. Шукаємо турботливу няню зі знанням англійської для хлопчика 2 років. Важливо вміти проводити активний час з дитиною, гратись, читати, займатись розвитком. Шукаємо турботливу няню зі знанням англійської для хлопчика 2 років. Важливо вміти проводити активний час з дитиною, гратись, читати, займатись розвитком. ",
  },
  {
    title: "Няня для хлопчика",
    price: "20000-35000 грн",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-ПТ, повна зайнятість",
    description:
      "Шукаємо турботливу, відповідальну няню для дитини віком 2 років. Родина проживає в Києві, потрібна няня з досвідом і любов’ю до дітей. Графік повний, оплата гідна.",
  },
  {
    title: "Няня для хлопчика",
    price: "Від 400 грн/год",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-ПТ, неповна зайнятість",
    description:
      "Шукаємо турботливу, відповідальну няню для дитини віком 2 років. Родина проживає в Києві, потрібна гнучка зайнятість. Няня має бути активною, пунктуальною, з досвідом.",
  },
  {
    title: "Няня для хлопчика зі знанням англійської",
    price: "20000-35000 грн",
    location: "Україна, м. Київ, район Оболонь",
    schedule: "ПН-СР, повна зайнятість",
    description:
      "Шукаємо турботливу няню зі знанням англійської для хлопчика 2 років. Важливо вміти проводити активний час з дитиною, гратись, читати, займатись розвитком.",
  },
];

export const VacationSection = () => {
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.destroy(); // важливо
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  return (
    <section className={s.section}>
      <Container>
        <div className={s.topBlock}>
          <h2>
            Актуальні<span> вакансії {line}</span>
          </h2>

          <div className={s.panel}>
            <div className={s.controller}>
              <Dropdown
                placeholder="Країна"
                options={["Україна", "Польща", "Німеччина"]}
              />
              <Dropdown
                placeholder="Місто"
                options={["Київ", "Варшава", "Берлін"]}
              />
              <Dropdown
                placeholder="Тип зайнятості"
                options={["Повна зайнятість", "Нe повна зайнятість"]}
              />
            </div>

            <Link href="/">Переглянути всі 42 вакансії</Link>
          </div>

          {svg}

          <Image
            alt="Plate"
            width={1920}
            height={1080}
            priority
            src="/icons/plate.svg"
            className={s.plate}
          />
        </div>

        <Swiper
          modules={[Navigation]}
          spaceBetween={24}
          slidesPerView={3}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          className={`${s.swiper} swiper`}
        >
          {nanniesData.map((item, index) => (
            <SwiperSlide key={index}>
              <VacationItem item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className={s.swiperController}>
          <div style={{ transform: "rotate(180deg)" }}>{buttonSvg}</div>

          <div ref={prevRef} className={s.swiperPrev}>
            {arrow}
          </div>
          <div ref={nextRef} className={s.swiperNext}>
            {arrow}
          </div>
          <div>{buttonSvg}</div>
        </div>
      </Container>
    </section>
  );
};

const line = (
  <svg viewBox="0 0 195 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2 15.5949C2.45184 12.3746 10.2611 10.229 13.0626 9.39704C19.2811 7.55038 24.0144 4.62166 30.7399 4.62166C34.8258 4.62166 52.0814 1.36315 43.2851 7.67204C41.0185 9.29771 41.0162 8.3894 39.8456 10.2144C38.2422 12.7142 41.1508 10.8755 42.9819 10.6716C52.0189 9.66526 59.7991 9.98828 68.9458 9.29771C83.7508 8.17993 100.311 10.4003 114.913 7.97489C125.853 6.1577 137.308 6.30047 148.196 4.62157C155.411 3.50917 162.687 2.08148 170.036 2.08148C172.464 2.08148 178.396 0.795266 178.191 3.91035C178.078 5.60885 172.111 7.8417 170.492 8.48252C168.708 9.18906 159.357 12.1403 162.794 12.1403C178.232 12.1403 178.379 10.0355 193.5 7.42374"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 41 46"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M16.7042 22.5332C16.7042 20.7201 15.7945 18.8687 14.9222 17.311C13.5712 14.8985 12.5268 12.4073 11.0612 10.0344C9.21849 7.05102 6.9824 4.37331 4.89844 1.59469"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M21.383 18.9707C21.383 16.5906 21.383 14.2105 21.383 11.8303C21.383 10.1397 21.3692 8.52649 21.1726 6.85557C21.0892 6.14669 21.2449 5.55215 20.9375 4.93745"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M9.13672 43.9707C11.0382 39.9949 11.9889 37.3155 14.5796 33.4465C19.2779 28.1251 23.4486 25.0541 29.2812 23.596C33.9793 22.4214 34.8066 22.1037 39.2434 22.1037"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M11.3555 24.7637C10.7488 24.6963 10.0886 23.7195 9.6725 23.3034C8.87905 22.51 8.00374 21.8574 7.20988 21.0635C6.03324 19.8869 4.55768 18.8968 3.21275 17.9079C2.77105 17.5831 2.24135 17.2274 2 16.7447"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const buttonSvg = (
  <svg
    className={s.svg}
    viewBox="0 0 42 61"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M39.582 32.7969L4.58203 32.7969"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M1.99929 52.7969C4.83361 52.7969 7.38321 54.5937 9.997 55.5442C13.2341 56.7213 16.5236 57.8612 19.582 59.3904"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M1.99929 8.39062C4.83361 8.39062 7.38321 6.59379 9.997 5.64332C13.2341 4.46621 16.5236 3.32629 19.582 1.7971"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
