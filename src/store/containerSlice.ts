import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IContainer } from "../models";


interface containersState {
    containers: IContainer[] | undefined
    container: IContainer | undefined
    searchText: string
}

const initialState: containersState = {
    containers: undefined,
    container: undefined,
    searchText: '',
}

const containerSlice = createSlice({
    name: 'container',
    initialState,
    reducers: {
        setFilter: (state, { payload }) => {
            state.searchText = payload
        },
        setContainers: (state, { payload }) => {
            state.containers = payload
        },
        setContainer: (state, { payload }) => {
            state.container = payload
        },
        resetContainer: (state) => {
            state.container = undefined;
        },
    },
});

export default containerSlice.reducer;

export const { setFilter, setContainers, setContainer, resetContainer } = containerSlice.actions;