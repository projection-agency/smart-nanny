"use client";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/client';
import { Accordion } from "@/components/Accordion/Accordion";
import s from "@/app/[locale]/offer/offer.module.css";
import { Breadcrumbs, BreadcrumbItem } from "@/components/Breadcrumbs/Breadcrumbs";

export default function OfferClient({ translation, locale }: { translation: Record<string, unknown>, locale: string }) {
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
    ? (translation && translation['offer_sections'] as unknown[]) || []
    : t('offer_sections', { returnObjects: true });

  const offerTitle = !isReady
    ? (translation && translation['offer_title'] as string) || ''
    : t('offer_title');

  const offerHero = !isReady
    ? (translation && translation['offer_hero'] as string) || ''
    : t('offer_hero');

  let heroBefore = '';
  let heroSpan = '';
  if (offerHero) {
    const text = offerHero.replace(/<[^>]+>/g, '').replace('{line}', '');
    const words = text.trim().split(' ');
    if (words.length > 2) {
      heroBefore = words.slice(0, -2).join(' ');
      heroSpan = words.slice(-2).join(' ');
    } else {
      heroSpan = text;
    }
  }

  const breadcrumbs: BreadcrumbItem[] = [
    { label: !isReady ? (translation && translation['breadcrumbs_home'] as string) || '' : t('breadcrumbs_home'), href: `/${locale}` },
    { label: offerTitle, active: true },
  ];

  type FaqType = { id?: number; question: string; answer: string };
  const sectionsArr: FaqType[] = Array.isArray(sections) && typeof sections[0] === 'string'
    ? (sections as string[]).map((title) => ({ question: title, answer: '' }))
    : (sections as FaqType[]);

  return (
    <main>
      <Breadcrumbs items={breadcrumbs} colorScheme="dark" />
      <section className={s.section}>
        <h1>
          {svg}
          {heroBefore && <>{heroBefore} </>}
          <span>{heroSpan}</span>
        </h1>
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

const line = (
  <svg viewBox="0 0 475 23" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M2.00006 21C2.58633 17.7797 12.719 15.6341 16.354 14.8022C24.4226 12.9555 30.5642 10.0268 39.2907 10.0268C44.5922 10.0268 66.9818 6.76828 55.5683 13.0772C52.6274 14.7028 52.6244 13.7945 51.1055 15.6195C49.0251 18.1193 52.799 16.2807 55.175 16.0768C66.9006 15.0704 76.9955 15.3934 88.8636 14.7028C108.073 13.5851 129.56 15.8054 148.506 13.38C162.702 11.5628 177.565 11.7056 191.693 10.0267C201.053 8.9143 210.495 7.48661 220.03 7.48661C223.18 7.48661 230.878 6.20039 230.611 9.31548C230.465 11.014 222.722 13.2468 220.622 13.8876C218.307 14.5942 206.174 17.5454 210.634 17.5454C230.665 17.5454 249.318 14.6705 268.937 12.0588C285.754 9.82022 302.758 5.65774 319.842 5.65774C339.867 5.65774 358.961 3.82887 379.108 3.82887C386.773 3.82887 393.092 1.92642 393.092 7.94382C393.092 9.93846 392.769 12.0954 391.464 13.8876C390.832 14.7552 385.358 18.646 386.433 16.9866C389.753 11.8571 403.681 11.6712 410.405 10.0267C420.557 7.54401 432.272 5.91747 442.96 4.7433C452.876 3.65395 462.899 2 473 2"
      stroke="#FF91B2"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

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