import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export type HomeData = {
  trainees: number | null;
  pendingPayments: number | null;
  underMaintenanceEquipments: number | null;
  totalPrograms: number | null;
  programs: { _id: string; programName: string }[] | null;
};

export type HomeState = {
  data: HomeData;
  isLoading: boolean;
};

const initialState: HomeState = {
  data: {
    trainees: null,
    pendingPayments: null,
    underMaintenanceEquipments: null,
    totalPrograms: null,
    programs: null,
  },
  isLoading: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setHomeData: (state, action: PayloadAction<HomeData>) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    setIsHomeDataLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export default homeSlice.reducer;

export const { setHomeData, setIsHomeDataLoading } = homeSlice.actions;

export const selectHomeData = (state: RootState) => state.home.data;

export const selectIsHomeDataLoading = (state: RootState) =>
  state.home.isLoading;
