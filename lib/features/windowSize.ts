import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
interface setWidthAndHeightTypes {
  width: number | undefined;
  height: number | undefined;
}
const initialState: setWidthAndHeightTypes = {
  width: undefined,
  height: undefined,
};

export const WindowSizeStates = createSlice({
  name: "windowSize",
  initialState: initialState,
  reducers: {
    setWidthAndHeight: (
      state,
      action: PayloadAction<{
        width: number | undefined;
        height: number | undefined;
      }>
    ) => {
      state.width = action.payload.width;
      state.height = action.payload.height;
    },
  },
});
export const { setWidthAndHeight } = WindowSizeStates.actions;

export default WindowSizeStates.reducer;
