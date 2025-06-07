import { API_URL } from "@/constants";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface Vacation {
  Employment_type: "full" | "part" | "hourly_assistance" | "with_accommodation";
  Title: string;
  Loc_country: string;
  Loc_city: string;
  Loc_district: string;
  Work_time: string;
  Description: string;
  Price: string;
}

export const fetchVacations = createAsyncThunk<Vacation[]>(
  "vacations/fetchVacations",
  async () => {
    const res = await fetch(`${API_URL}v2/vacancy`);
    if (!res.ok) throw new Error("Failed to fetch");
    const data = await res.json();
    return data;
  }
);

export interface VacationState {
  vacations: Vacation[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: {
    country: string | null;
    city: string | null;
    employment: Vacation["Employment_type"] | null;
  };
}

const initialState: VacationState = {
  vacations: [],
  status: "idle",
  error: null,
  filters: {
    country: null,
    city: null,
    employment: null,
  },
};

export const vacationSlice = createSlice({
  name: "vacations",
  initialState,

  reducers: {
    setCountryFilter(state, action) {
      state.filters.country = action.payload;
    },
    setCityFilter(state, action) {
      state.filters.city = action.payload;
    },
    setEmploymentFilter(state, action) {
      state.filters.employment = action.payload;
    },
    resetFilters(state) {
      state.filters.country = null;
      state.filters.city = null;
      state.filters.employment = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVacations.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchVacations.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vacations = action.payload;
      })
      .addCase(fetchVacations.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Щось пішло не так";
      });
  },
});

export const {
  setCountryFilter,
  setCityFilter,
  setEmploymentFilter,
  resetFilters,
} = vacationSlice.actions;

export default vacationSlice.reducer;
