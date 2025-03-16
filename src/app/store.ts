import { configureStore, Middleware } from "@reduxjs/toolkit";
import logger from "redux-logger";

import { apiSlice } from "./api/api.slice";
import authReducer from "../features/auth/auth.slice";
import homeReducer from "../features/home/home.slice";
import programsReducer from "../features/programs/programs.slice";
import staffReducer from "../features/staff/staff.slice";

const middlewares = [
  apiSlice.middleware,
  // import.meta.env.MODE !== "production" && logger,
].filter((middleware): middleware is Middleware => Boolean(middleware));

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    home: homeReducer,
    programs: programsReducer,
    staff: staffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
