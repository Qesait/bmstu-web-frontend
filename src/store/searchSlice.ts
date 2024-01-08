import { createSlice } from "@reduxjs/toolkit";

interface searchState {
    type: string

    user: string
    status: string
    formationDateStart: string | null
    formationDateEnd: string | null
}

const initialState: searchState = {
    type: '',

    user: '',
    status: '',
    formationDateStart: null,
    formationDateEnd: null,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setType: (state, { payload }) => {
            state.type = payload
        },
        setUser: (state, { payload }) => {
            state.user = payload
        },
        setStatus: (state, { payload }) => {
            state.status = payload
        },
        setDateStart: (state, { payload }) => {
            state.formationDateStart = payload
        },
        setDateEnd: (state, { payload }) => {
            state.formationDateEnd = payload
        },
    },
});

export default searchSlice.reducer;

export const { setType, setUser, setStatus, setDateStart, setDateEnd } = searchSlice.actions;