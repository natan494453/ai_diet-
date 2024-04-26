import { configureStore } from "@reduxjs/toolkit";
import fetchStates from "./features/fetchStates";
import WindowSizeStates from "./features/windowSize";
export const makeStore = () => {
  return configureStore({
    reducer: { fetchStates, WindowSizeStates },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
