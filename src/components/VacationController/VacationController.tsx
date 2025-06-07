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

export const VacationController = () => {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const cities = useSelector(selectCitiesByCountry);
  const countries = useSelector(selectCountries);
  const selectedCity = useSelector(
    (state: RootState) => state.vacations.filters.city
  );

  const vacations = useSelector(
    (state: RootState) => state.vacations.vacations
  );

  const employmentMap: Record<string, Vacation["Employment_type"]> = {
    "Повна зайнятість": "full",
    "Неповна зайнятість": "part",
    "Погодинна допомога": "hourly_assistance",
    "З проживанням": "with_accommodation",
  };

  const employmentOptions = Object.keys(employmentMap);

  return (
    <div
      className={`${s.panel} ${
        pathname.includes("vacation") ? " " : s.unactive
      }`}
    >
      <div className={s.controller}>
        <Dropdown
          placeholder="Країна"
          options={countries}
          onSelect={(value) => {
            dispatch(setCountryFilter(value));
            dispatch(setCityFilter(null));
          }}
        />

        <Dropdown
          placeholder="Місто"
          options={cities}
          value={selectedCity}
          onSelect={(value) => dispatch(setCityFilter(value))}
        />

        <Dropdown
          placeholder="Тип зайнятості"
          options={employmentOptions}
          onSelect={(value) => {
            dispatch(setEmploymentFilter(employmentMap[value]));
          }}
        />
      </div>

      <Link
        onClick={() => {
          dispatch(resetFilters());
        }}
        href="/vacation"
      >
        Переглянути всі {vacations.length} вакансії
      </Link>
    </div>
  );
};
