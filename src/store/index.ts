import { configureStore } from "@reduxjs/toolkit";
import containerFilterReducer from "./containerFilterSlice";

export const store = configureStore({
    reducer: {
        containerFilter: containerFilterReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;