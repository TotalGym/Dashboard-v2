import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type ProgramsState = {
  availablePrograms: { _id: string; programName: string }[] | null;
};

const initialState: ProgramsState = {
  availablePrograms: null,
};

const programsSlice = createSlice({
  name: "programs",
  initialState,
  reducers: {
    setPrograms: (
      state,
      action: PayloadAction<{ _id: string; programName: string }[]>
    ) => {
      state.availablePrograms = action.payload;
    },
  },
});

export const { setPrograms } = programsSlice.actions;

export default programsSlice.reducer;

export const selectPrograms = (state: RootState) =>
  state.programs.availablePrograms;
