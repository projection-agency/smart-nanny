"use client";

import Link from "next/link";
import { Dropdown } from "../Dropdown/Dropdown";
import s from "./VacationController.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setCountryFilter,
  setCityFilter,
  setEmploymentFilter,
  resetFilters,
  Vacation,
} from "@/store/vacationSlice";
import { selectCitiesByCountry, selectCountries } from "@/store/selectors";
import { RootState } from "@/store/store";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import i18n from "@/i18n/client";

export const VacationController = ({
  translation,
  locale,
}: {
  translation: Record<string, unknown>;
  locale: string;
}) => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cities = useSelector(selectCitiesByCountry);
  const countries = useSelector(selectCountries);
  const selectedCity = useSelector(
    (state: RootState) => state.vacations.filters.city
  );
  const selectedCountry = useSelector(
    (state: RootState) => state.vacations.filters.country
  );
  const selectedEmployment = useSelector(
    (state: RootState) => state.vacations.filters.employment
  );

  const vacations = useSelector(
    (state: RootState) => state.vacations.vacations
  );
  const { t } = useTranslation("common");
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (translation && locale) {
      i18n.addResourceBundle(locale, "common", translation, true, true);
      i18n.changeLanguage(locale).then(() => setIsReady(true));
    }
  }, [translation, locale]);

  // SSR-safe for all text fields
  const employmentFull = !isReady
    ? (translation && (translation["employment_full"] as string)) || ""
    : t("employment_full");
  const employmentPart = !isReady
    ? (translation && (translation["employment_part"] as string)) || ""
    : t("employment_part");
  const employmentHourly = !isReady
    ? (translation && (translation["employment_hourly"] as string)) || ""
    : t("employment_hourly");
  const employmentAccommodation = !isReady
    ? (translation && (translation["employment_accommodation"] as string)) || ""
    : t("employment_accommodation");
  const vacationCountry = !isReady
    ? (translation && (translation["vacation_country"] as string)) || ""
    : t("vacation_country");
  const vacationCity = !isReady
    ? (translation && (translation["vacation_city"] as string)) || ""
    : t("vacation_city");
  const vacationEmployment = !isReady
    ? (translation && (translation["vacation_employment"] as string)) || ""
    : t("vacation_employment");
  const vacationAllCount = !isReady
    ? (
        (translation && (translation["vacation_all_count"] as string)) ||
        ""
      ).replace("{{count}}", vacations.length.toString())
    : t("vacation_all_count", { count: vacations.length });

  const employmentMap: Record<string, Vacation["Employment_type"]> = {
    [employmentFull]: "full",
    [employmentPart]: "part",
    [employmentHourly]: "hourly_assistance",
    [employmentAccommodation]: "with_accommodation",
  };

  const employmentOptions = [
    employmentFull,
    employmentPart,
    employmentHourly,
    employmentAccommodation,
  ];

  const handleEraseFilters = () => {
    dispatch(setCityFilter(null));
    dispatch(setCountryFilter(null));
    dispatch(setEmploymentFilter(null));
  };
  return (
    <div
      className={`${s.panel} ${
        pathname.includes("vacation") ? " " : s.unactive
      }`}
    >
      <div className={s.controller}>
        <Dropdown
          placeholder={vacationCountry}
          options={countries}
          value={selectedCountry}
          onSelect={(value) => {
            dispatch(setCountryFilter(value));
            dispatch(setCityFilter(null));
          }}
        />

        <Dropdown
          placeholder={vacationCity}
          options={cities}
          value={selectedCity}
          onSelect={(value) => dispatch(setCityFilter(value))}
        />

        <Dropdown
          placeholder={vacationEmployment}
          options={employmentOptions}
          value={selectedEmployment}
          onSelect={(value) => {
            dispatch(setEmploymentFilter(employmentMap[value]));
          }}
        />
      </div>

      <button
        className={s.eraseFiltersMobile}
        onClick={() => handleEraseFilters()}
      >
        Скинути фільтри
      </button>

      <Link
        onClick={() => {
          dispatch(resetFilters());
        }}
        href={`/${locale}/vacation`}
      >
        {vacationAllCount}
      </Link>

      {pathname.includes("/vacation") ? (
        <button
          className={s.eraseFiltersDesktop}
          onClick={() => handleEraseFilters()}
        >
          Скинути фільтри
        </button>
      ) : (
        ""
      )}
    </div>
  );
};
