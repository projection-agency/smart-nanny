"use client";

import "@/i18n/client";
import i18n from "@/i18n/client";

import React, { useState, useEffect } from "react";
import s from "./Header.module.css";
import { Container } from "../Container";
import Image from "next/image";
import Link from "next/link";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { useModal } from "../ModalContext";
import SidePanel from "../SidePanel/SidePanel";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "@/hooks/useAnalytics";

export const Header = ({
  translation,
  locale,
}: {
  translation: unknown;
  locale: string;
}) => {
  const [sidePanelIsOpen, setSidePanelIsOpen] = useState(false);
  const { openModal } = useModal();
  const { t } = useTranslation("common");
  const { trackButtonClick } = useAnalytics();

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale);
    }
  }, [translation, locale]);

  const getHref = (path: string) => `/${locale}${path === "/" ? "" : path}`;

  const openSidePanel = () => {
    setSidePanelIsOpen(true);
    trackButtonClick("mobile_menu", "header");
  };

  const closeSidePanel = () => {
    setSidePanelIsOpen(false);
  };

  return (
    <header className={s.header}>
      <Container className="flex justify-between">
        <button
          className={s.mobileMenuBtn}
          onClick={() => {
            openSidePanel();
          }}
        >
          <Image
            src="/icons/mobile-menu-icon.svg"
            className={s.mobileMenuIcon}
            alt="Mobile menu icon"
            width={0}
            height={0}
            style={{ width: "4.8vw", height: "4.8vw" }}
            priority
          />
        </button>

        <div className={s.headerLeftBlock}>
          <Link href={getHref("/")}>
            <Image
              src="/icons/header-logo.svg"
              className={s.headerLogo}
              alt="Heder logo"
              width={0}
              height={0}
              priority
            />
          </Link>
          <nav className={s.hiddenOnMobile}>
            <ul>
              <li>
                <Link href={getHref("/")}>{t("nanny_selection")}</Link>
              </li>
              <li>
                <Link href={getHref("/education")}>{t("education")}</Link>
              </li>
              <li>
                <Link href={getHref("/nanny-selection")}>
                  {t("become_nanny")}
                </Link>
              </li>
              <li>
                <Link href={getHref("/vacation")}>{t("vacancies")}</Link>
              </li>
              <li>
                <Link href={getHref("/blog")}>{t("blog")}</Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={s.headerRightBlock}>
          <LanguageSwitcher />

          <div
            onClick={() => {
              openModal("formA");
              trackButtonClick("order_call", "header");
            }}
            className={s.call}
          >
            <span className={s.hiddenOnMobile}>{t("order_call")}</span>

            <div className={s.callIconMobileCont}>
              <Image
                src="/icons/icon-call.svg"
                className={s.callIconMobile}
                alt="Icon Calll"
                width={0}
                height={0}
                // style={{ width: "5vw", height: "auto" }}
                priority
              />
            </div>

            <div className={s.icon}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_842_499)">
                  <path
                    d="M3.84375 0.75C3.93848 0.758381 4.03113 0.781931 4.11816 0.819336L4.20703 0.864258C4.3222 0.929788 4.42204 1.01939 4.49805 1.12793L4.50391 1.13672L4.51074 1.14551C4.52548 1.16623 5.0515 1.8994 5.56348 2.73828C5.82199 3.16186 6.07158 3.60403 6.24707 3.98633C6.33488 4.17764 6.40112 4.3488 6.44141 4.49121C6.48325 4.63923 6.48913 4.73029 6.48145 4.77539C6.444 4.98756 6.3353 5.13246 6.0498 5.3877L5.70117 5.68652C5.6143 5.75958 5.40377 5.93674 5.25195 6.07617L5.13379 6.18457L5.18359 6.33789C5.27922 6.63133 5.3958 6.91749 5.53223 7.19434V7.19531C6.22695 8.62215 7.37996 9.77473 8.80664 10.4697V10.4707C9.08398 10.6074 9.37111 10.7234 9.66504 10.8193L9.81836 10.8691L9.92676 10.751C10.0657 10.5996 10.243 10.3891 10.3145 10.3037L10.3135 10.3027C10.7225 9.81606 10.8993 9.62141 11.126 9.54688L11.2266 9.52246L11.2295 9.52148C11.275 9.51298 11.3666 9.5178 11.5146 9.55859C11.6566 9.59775 11.827 9.66305 12.0176 9.75C12.3987 9.92386 12.8386 10.1732 13.2607 10.4316C13.6817 10.6894 14.0796 10.9535 14.375 11.1553C14.5225 11.256 14.6446 11.3406 14.7305 11.4014C14.8187 11.4638 14.8622 11.4961 14.8623 11.4961L14.8682 11.5L14.874 11.5049C14.9819 11.5807 15.0716 11.6793 15.1367 11.7939C15.1997 11.9049 15.2377 12.0283 15.249 12.1553C15.2472 12.1979 15.2241 12.2827 15.1455 12.416C15.0672 12.5488 14.9503 12.7049 14.8008 12.876C14.5023 13.2174 14.0935 13.5993 13.6631 13.959C13.2333 14.3181 12.7883 14.6497 12.4199 14.8896C12.2354 15.0099 12.0734 15.1043 11.9453 15.168C11.8815 15.1997 11.8297 15.2217 11.79 15.2354C11.7469 15.2502 11.7327 15.25 11.7393 15.25C11.6995 15.2491 8.78071 15.187 5.03809 11.6855L4.66895 11.332C0.816766 7.4118 0.750976 4.30187 0.75 4.26074C0.749988 4.26733 0.749771 4.25313 0.764648 4.20996C0.778356 4.17028 0.800322 4.11848 0.832031 4.05469C0.895627 3.92676 0.990271 3.76544 1.11035 3.58105C1.35026 3.21272 1.68182 2.76682 2.04102 2.33691C2.40065 1.90649 2.78264 1.49771 3.12402 1.19922C3.29506 1.04968 3.45123 0.93279 3.58398 0.854492C3.71635 0.776476 3.80085 0.752158 3.84375 0.75Z"
                    fill="#FF91B2"
                    stroke="#FDF8F5"
                    strokeWidth="0.5"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_842_499">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        </div>
        <SidePanel
          isOpen={sidePanelIsOpen}
          onClose={closeSidePanel}
          locale={locale}
        />
      </Container>
    </header>
  );
};
