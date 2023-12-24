import { configureStore } from "@reduxjs/toolkit";
import containerFilterReducer from "./containerFilterSlice";
import authorizationReducer from "./authorizationSlice";

export const store = configureStore({
    reducer: {
        containerFilter: containerFilterReducer,
        authorization: authorizationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;