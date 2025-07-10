"use client"
import s from "./SidePanel.module.css";
import Image from "next/image";
import SidePanelLangSwitcher from "../SidePanelLangSwitcher/SidePanelLangSwitcher";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const navLinks = [
  { title: "Підбір няні", link: "" },
  { title: "Навчання", link: "education" },
  { title: "Стати нянею", link: "nanny-selection" },
  { title: "Вакансії", link: "vacation" },
  { title: "Блог", link: "blog" },
];

const SidePanel = ({ isOpen, onClose, locale }) => {
  const {t} = useTranslation("common");
  const getHref = (path) => `/${locale}${path === "/" ? "" : path}`;
  
  return (
    <aside className={`${s.sidePanel} ${isOpen ? s.isOpen : " "}`}>
      <div className={s.sidePanelCont}>
        <header>
          <button onClick={() => onClose()}>
            <Image
              width={1920}
              height={1080}
              src="/icons/icon-close.svg"
              alt="Logotype"
            />
          </button>
          <Image
            className={s.headerLogo}
            width={1920}
            height={1080}
            src="/icons/header-logo.svg"
            alt="Logotype"
          />
        </header>
        <SidePanelLangSwitcher />

        <nav className={s.nav}>
          <h2>{t("mobile_sidebar_menu")}</h2>
          <ul className={s.sidePanelNavList}>
            <li>
              <Link href={getHref("/")} onClick={() => onClose()}>
                {t("nanny_selection")}
              </Link>
            </li>
            <li>
              <Link href={getHref("/education")} onClick={() => onClose()}>
                {t("education")}
              </Link>
            </li>
            <li>
              <Link
                href={getHref("/nanny-selection")}
                onClick={() => onClose()}
              >
                {t("become_nanny")}
              </Link>
            </li>
            <li>
              <Link href={getHref("/vacation")} onClick={() => onClose()}>
                {t("vacancies")}
              </Link>
            </li>
            <li>
              <Link href={getHref("/blog")} onClick={() => onClose()}>
                {t("blog")}
              </Link>
            </li>
          </ul>
        </nav>

        <div className={s.contacts}>
          <div>
            <p className={s.contactSubtitle}>{t("mobile_sidebar_write_us")}</p>
            <a href="">service.smartnanny@gmail.com</a>
          </div>
          <div>
            <p className={s.contactSubtitle}>{t("mobile_sidebar_write_us")}</p>
            <a href="">+38 (098) 308 58 47</a>
          </div>

          <ul className={s.socialLinks}>
            <li>
              <Link href="https://www.instagram.com/smartnanny.service/">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-inst.svg"
                  alt="Logotype"
                />
              </Link>
            </li>

            <li>
              <Link href="https://tinyurl.com/erpws66m">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-viber.svg"
                  alt="Logotype"
                />
              </Link>
            </li>

            <li>
              <Link href="https://t.me/smartnanny_service">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-tg.svg"
                  alt="Logotype"
                />
              </Link>
            </li>

            <li>
              <Link href="https://wa.me/380983085847">
                <Image
                  width={32}
                  height={32}
                  src="/icons/sidebar/icon-whatsapp.svg"
                  alt="Logotype"
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default SidePanel;
