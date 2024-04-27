import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface FetchState {
  value: boolean;
  valueOfFev: boolean;
}
const initialState: FetchState = {
  value: false,
  valueOfFev: false,
};

export const fetchStates = createSlice({
  name: "fetchSlice",
  initialState: initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.value = !state.value;
    },
    addFav: (state, action) => {
      state.valueOfFev = !state.value;
    },
  },
});
export const { addRecipe, addFav } = fetchStates.actions;

export default fetchStates.reducer;
