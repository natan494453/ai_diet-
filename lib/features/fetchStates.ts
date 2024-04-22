import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface FetchState {
  value: boolean;
}
const initialState: FetchState = {
  value: false,
};

export const fetchStates = createSlice({
  name: "fetchSlice",
  initialState: initialState,
  reducers: {
    addRecipe: (state, action) => {
      state.value = !state.value;
    },
  },
});
export const { addRecipe } = fetchStates.actions;

export default fetchStates.reducer;
