"use client";
import { useEffect, useState } from "react";
import i18n from "@/i18n/client";
import Spinner from "@/components/Spinner";

export default function ClientLayout({ children, translation, locale }: { children: React.ReactNode, translation: unknown, locale: string }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, 'common', translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  if (!isReady) {
    return <Spinner />;
  }

  return <>{children}</>;
} 