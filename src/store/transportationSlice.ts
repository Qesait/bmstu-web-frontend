import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IContainer } from "../models";


interface transportationState {
    draft: string | null
}

const initialState: transportationState = {
    draft: null
}

const transportationSlice = createSlice({
    name: 'containerFilter',
    initialState,
    reducers: {
        setDraft: (state, { payload }) => {
            state.draft = payload
        },
    },
});

export default transportationSlice.reducer;

export const { setDraft } = transportationSlice.actions;