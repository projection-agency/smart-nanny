import i18next from "i18next";
import Backend from "i18next-fs-backend";
import path from "path";

export async function initI18n(locale: string) {
  if (!i18next.isInitialized) {
    await i18next
      .use(Backend)
      .init({
        lng: locale,
        fallbackLng: "ua",
        ns: ["common"],
        defaultNS: "common",
        backend: {
          loadPath: path.resolve(process.cwd(), "public/locales/{{lng}}/{{ns}}.json"),
        },
        interpolation: { escapeValue: false },
      });
  } else {
    i18next.changeLanguage(locale);
  }
  return i18next;
} 