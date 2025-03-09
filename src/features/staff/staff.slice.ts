import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

type StaffState = {
  availableCoaches: { _id: string; name: string }[] | null;
};

const initialState: StaffState = {
  availableCoaches: null,
};

const staffSlice = createSlice({
  name: "staff",
  initialState,
  reducers: {
    setAvailableCoaches: (
      state,
      action: PayloadAction<{ _id: string; name: string }[]>
    ) => {
      state.availableCoaches = action.payload;
    },
  },
});

export const { setAvailableCoaches } = staffSlice.actions;

export default staffSlice.reducer;

export const selectAvailabelCoaches = (state: RootState) =>
  state.staff.availableCoaches;
