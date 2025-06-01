import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "./store";

export const selectVacationsState = (state: RootState) => state.vacations;

export const selectVacations = createSelector(
  [selectVacationsState],
  (vacationsState) => vacationsState.vacations
);

export const selectCountries = createSelector(
  [selectVacations],
  (vacations) => [
    ...new Set(vacations.map((v) => v.Loc_country).filter(Boolean)),
  ]
);

export const selectFilteredVacations = createSelector(
  [selectVacationsState],
  ({ vacations, filters }) =>
    vacations.filter((vac) => {
      const matchCountry = filters.country
        ? vac.Loc_country === filters.country
        : true;
      const matchCity = filters.city ? vac.Loc_city === filters.city : true;
      const matchEmployment = filters.employment
        ? vac.Employment_type === filters.employment
        : true;

      return matchCountry && matchCity && matchEmployment;
    })
);

export const selectCitiesByCountry = createSelector(
  [selectVacationsState],
  ({ vacations, filters }) => {
    const cities = vacations
      .filter((v) =>
        filters.country ? v.Loc_country === filters.country : true
      )
      .map((v) => v.Loc_city);

    return Array.from(new Set(cities));
  }
);
