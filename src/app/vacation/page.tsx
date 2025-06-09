"use client";

import { VacationController } from "@/components/VacationController/VacationController";
import s from "./vacation.module.css";
import { Container } from "@/components/Container";
import { VacationItem } from "@/components/VacationItem/VacationItem";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredVacations } from "@/store/selectors";
import { AppDispatch } from "@/store/store";
import { fetchVacations } from "@/store/vacationSlice";
import { useEffect, useState } from "react";
import Image from "next/image";
import VacancySidebar from "../../components/VacancySidebar/VacancySidebar";
import { Breadcrumbs, BreadcrumbItem } from "@/components/Breadcrumbs/Breadcrumbs";

// export const metadata = {
//   title: "Вакансії",
//   description: "Ми підбираємо надійних нянь, яким можна довірити вашу дитину.",
// };

export default function Vacations() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    dispatch(fetchVacations());
  }, [dispatch]);

  const filtered = useSelector(selectFilteredVacations);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Головна", href: "/" },
    { label: "Вакансії", active: true },
  ];

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="dark" />
      <section className={s.section}>
        <div className={s.titleCOntainer}>
          <h2>
            <span>Актуальні {line}</span> вакансії для нянь{svg}
          </h2>

          <p>
            Обирайте перевірені пропозиції від родин, з якими працює агентство
            Smart Nanny
          </p>
        </div>

        <div className={`lg:mb-[3.7vw] ${s.vacationControllerDesktop}`}>
          <VacationController />
        </div>

        <button className={s.openSidebarBtn} onClick={()=>openModal()}>
          <Image
            width={17}
            height={16}
            src="/icons/icon-filter.svg"
            alt="filter"
          />
          Фільтри
        </button>

        <Container className={s.container}>
          <ul className={s.vacationsList}>
            {filtered.map((item, index) => (
              <VacationItem key={index} item={item} />
            ))}
          </ul>
        </Container>
      </section>

      {!isDesktop && <VacancySidebar isOpen={modalIsOpen} onClose={closeModal} />}
    </main>
  );
}

const line = (
  <svg viewBox="0 0 290 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M1.50004 20.7578C1.85727 17.5375 8.03152 15.3919 10.2465 14.56C15.163 12.7133 18.9054 9.7846 24.2228 9.7846C27.4532 9.7846 41.0961 6.52609 34.1414 12.835C32.3494 14.4606 32.3476 13.5523 31.4221 15.3773C30.1544 17.8772 32.454 16.0385 33.9017 15.8346C41.0466 14.8282 47.1979 15.1512 54.4296 14.4606C66.135 13.3429 79.2277 15.5632 90.7725 13.1378C99.4224 11.3206 108.479 11.4634 117.088 9.78451C122.792 8.67211 128.544 7.24442 134.355 7.24442C136.274 7.24442 140.965 5.9582 140.802 9.07329C140.714 10.7718 135.995 13.0046 134.716 13.6455C133.305 14.352 125.912 17.3032 128.629 17.3032C140.835 17.3032 152.201 14.4284 164.156 11.8166C174.403 9.57803 184.765 5.41555 195.174 5.41555C207.377 5.41555 219.011 3.58668 231.287 3.58668C235.958 3.58668 239.808 1.68424 239.808 7.70164C239.808 9.69628 239.612 11.8532 238.817 13.6455C238.432 14.513 235.096 18.4038 235.751 16.7444C237.774 11.6149 246.261 11.429 250.358 9.78451C256.544 7.30183 263.683 5.67529 270.196 4.50112C276.238 3.41176 282.345 1.75781 288.5 1.75781"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 73 65"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M37.2645 27.2955C40.115 27.4948 43.128 26.2379 45.675 25.0087C49.6196 23.105 53.6534 21.7021 57.5486 19.61C62.446 16.9796 66.9069 13.684 71.5095 10.6438"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M41.7623 34.6274C45.4845 34.8877 49.2068 35.148 52.929 35.4083C55.573 35.5932 58.098 35.7387 60.7419 35.4813C61.8636 35.372 62.769 35.7855 63.7784 35.1645"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M4.25 11.9561C10.3867 15.4242 14.559 17.2354 20.4486 21.7878C28.4227 29.8543 32.8622 36.8304 34.5417 46.2696C35.8946 53.8728 36.3099 55.2242 35.8164 62.2806"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M33.9029 18.0387C34.0797 17.0759 35.7332 16.1304 36.4526 15.5119C37.8245 14.3326 38.9778 13.0064 40.3504 11.8265C42.3848 10.0776 44.151 7.82947 45.9007 5.79019C46.4753 5.12045 47.11 4.31346 47.9176 3.98203"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);
