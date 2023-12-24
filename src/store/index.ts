import { configureStore } from "@reduxjs/toolkit";
import containerReducer from "./containerSlice";
import transportationReducer from "./transportationSlice";

export const store = configureStore({
    reducer: {
        container: containerReducer,
        transportation: transportationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;