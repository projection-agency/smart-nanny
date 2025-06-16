"use client";

import s from "./SidePanelLangSwitcher.module.css";
import { useParams, usePathname,useRouter } from "next/navigation";
import Image from "next/image";
import i18n from "@/i18n/client";
import { setLanguageCookie } from "@/utils/setLanguageCookie";
const languages = ["UA", "EN"];
const localeMap = { UA: "ua", EN: "en" };

const SidePanelLangSwitcher = () => {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter()

  // Визначаємо поточну мову з params
  const currentLocale = params.locale;
  const currentLang = currentLocale === "en" ? "EN" : "UA";

  const selectLang = (lang) => {
    const newLocale = localeMap[lang];
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", lang);
    }
    // Формуємо новий шлях з новою локаллю
    const segments = pathname.split("/");
    segments[1] = newLocale; // замінюємо локаль
    const newPath = segments.join("/") || "/";
    router.push(newPath);
    setLanguageCookie(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <ul className={s.languages}>
      {languages.map((item, index) => {
        console.log(item);
        return (
          <li
            className={currentLang === item ? s.active : ""}
            key={index}
            onClick={() => selectLang(item)}
          >
            {item}
            {currentLang === item ? (
              <Image
                src="/icons/sidebar/lang-active.svg"
                alt="language"
                width={28}
                height={4}
              />
            ) : (
              ""
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default SidePanelLangSwitcher;
