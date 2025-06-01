import Link from "next/link";
import { Dropdown } from "../Dropdown/Dropdown";
import s from "./VacationController.module.css";

import { useDispatch, useSelector } from "react-redux";
import {
  setCountryFilter,
  setCityFilter,
  setEmploymentFilter,
  resetFilters,
} from "@/store/vacationSlice";
import { selectCitiesByCountry, selectCountries } from "@/store/selectors";
import { RootState } from "@/store/store";

export const VacationController = () => {
  const dispatch = useDispatch();
  const cities = useSelector(selectCitiesByCountry);
  const countries = useSelector(selectCountries);
  const selectedCity = useSelector(
    (state: RootState) => state.vacations.filters.city
  );

  const vacations = useSelector(
    (state: RootState) => state.vacations.vacations
  );

  return (
    <div className={s.panel}>
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
          options={["Повна зайнятість", "Нe повна зайнятість"]}
          onSelect={(value) =>
            dispatch(
              setEmploymentFilter(
                value === "Повна зайнятість" ? "full" : "part"
              )
            )
          }
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
