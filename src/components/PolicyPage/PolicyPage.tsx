"use client";

import { useState, useEffect } from "react";
import { Accordion } from "@/components/Accordion/Accordion";
import s from "../../app/[locale]/offer/offer.module.css";
import { Breadcrumbs, BreadcrumbItem } from "@/components/Breadcrumbs/Breadcrumbs";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/client';


const svg = (
  <svg
    className={s.svg}
    viewBox="0 0 64 73"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M26.3131 36.592C26.5124 33.7414 25.2555 30.7284 24.0263 28.1815C22.1225 24.2369 20.7197 20.2031 18.6276 16.3079C15.9972 11.4104 12.7016 6.9495 9.66134 2.34699"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M33.646 32.0932C33.9063 28.3709 34.1666 24.6487 34.4269 20.9265C34.6117 18.2825 34.7573 15.7575 34.4998 13.1136C34.3906 11.9919 34.8041 11.0865 34.1831 10.077"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M10.9727 69.6045C14.4408 63.4678 16.252 59.2955 20.8044 53.4059C28.8709 45.4318 35.847 40.9923 45.2862 39.3128C52.8894 37.9599 54.2408 37.5446 61.2972 38.0381"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
    <path
      d="M17.0572 39.9546C16.0945 39.7777 15.1489 38.1242 14.5305 37.4048C13.3512 36.0329 12.025 34.8797 10.845 33.507C9.09613 31.4726 6.84802 29.7064 4.80875 27.9567C4.139 27.3821 3.33201 26.7475 3.00058 25.9399"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

export function PolicyPage({ translation, locale }: { translation: Record<string, unknown>, locale: string }) {
  const { t } = useTranslation('common');
  const [openId, setOpenId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, 'common', translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  const toggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const sections = !isReady
    ? (translation && translation['policy_sections'] as unknown[]) || []
    : t('policy_sections', { returnObjects: true });

  const policyTitle = !isReady
    ? (translation && translation['policy_title'] as string) || ''
    : t('policy_title');

  const policyHero = !isReady
    ? (translation && translation['policy_hero'] as string) || ''
    : t('policy_hero');

  const policyDate = !isReady
    ? (translation && translation['policy_date'] as string) || ''
    : t('policy_date');

  const policyDesc = !isReady
    ? (translation && translation['policy_desc'] as string) || ''
    : t('policy_desc');

  // Hero split logic (as in OfferClient)
  let heroBefore = '';
  let heroSpan = '';
  if (policyHero) {
    const text = policyHero.replace(/<[^>]+>/g, '').replace('{line}', '');
    const words = text.trim().split(' ');
    if (words.length > 1) {
      heroBefore = words.slice(0, -1).join(' ');
      heroSpan = words.slice(-1).join(' ');
    } else {
      heroSpan = text;
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: !isReady ? (translation && translation['breadcrumbs_home'] as string) || '' : t('breadcrumbs_home'), href: `/${locale}` },
    { label: policyTitle, active: true },
  ];

  type FaqType = { id?: number; question: string; answer: string };
  const sectionsArr: FaqType[] = Array.isArray(sections) && typeof sections[0] === 'string'
    ? (sections as string[]).map((title) => ({ question: title, answer: '' }))
    : (sections as FaqType[]);

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="dark" />
      <section className={s.section}>
        <div className={s.titleContainer}>
          <h1>
            {svg}
            {heroBefore && <>{heroBefore} </>}
            <span>{heroSpan}</span>
          </h1>
          <span className={s.span}>{policyDate}</span>
          <p className={s.text}>{policyDesc}</p>
        </div>
        <ul className={s.list}>
          {sectionsArr.map((faq, idx) => (
            <Accordion
              key={faq.id || idx}
              id={faq.id || idx}
              isOpen={openId === (faq.id || idx)}
              onToggle={toggle}
              title={faq.question}
              faq={true}
            >
              <p>{faq.answer}</p>
            </Accordion>
          ))}
        </ul>
      </section>
    </main>
  );
} 