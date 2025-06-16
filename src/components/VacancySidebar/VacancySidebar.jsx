"use client";

import s from "./VacancySidebar.module.css";
import Image from "next/image";
import { VacationController } from "../VacationController/VacationController";
import { useTranslation } from "react-i18next";

const VacancySidebar = ({ isOpen, onClose, translation, locale }) => {
  const { t } = useTranslation("common");
  return (
    <aside className={`${s.sidebar} ${isOpen ? s.isOpen : ""}`}>
      <header>
        <h2>{t("vacation_mobile_filter")}</h2>
        <button onClick={() => onClose()}>
          <Image
            width={1920}
            height={1080}
            src="/icons/icon-close.svg"
            alt="Logotype"
          />
        </button>
      </header>
      <VacationController
        translation={translation}
        locale={locale}
      ></VacationController>
    </aside>
  );
};

export default VacancySidebar;
