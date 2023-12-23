import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface searchState {
    searchText: string
}

const initialState: searchState = {
    searchText: '',
}

const containerFilterSlice = createSlice({
    name: 'containerFilter',
    initialState,
    reducers: {
        setFilter: (state, action: PayloadAction<string>) => {
            state.searchText = action.payload
        },
    },
});

export default containerFilterSlice.reducer;

export const { setFilter } = containerFilterSlice.actions;