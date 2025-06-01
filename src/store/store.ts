import { configureStore } from "@reduxjs/toolkit";
import vacationsReducer from "./vacationSlice";

export const makeStore = () =>
  configureStore({
    reducer: {
      vacations: vacationsReducer,
    },
  });

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
