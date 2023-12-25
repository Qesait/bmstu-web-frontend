import { createSlice } from "@reduxjs/toolkit";
import { ITransportation, IContainer } from "../models";


interface transportationState {
    draft: string | null
    transportations: ITransportation[] | null
    transportation: ITransportation | null
    transportationComposition: IContainer[]

    statusFilter: string
    formationDateStart: string | null
    formationDateEnd: string | null
}

const initialState: transportationState = {
    draft: null,
    transportations: null,
    transportation: null,
    transportationComposition: [],

    statusFilter: '',
    formationDateStart: null,
    formationDateEnd: null,
}

const transportationSlice = createSlice({
    name: 'transportatioin',
    initialState,
    reducers: {
        setDraft: (state, { payload }) => {
            state.draft = payload
        },
        setTransportations: (state, { payload }) => {
            state.transportations = payload
        },
        setTransportation: (state, { payload }) => {
            state.transportation = payload
        },
        setComposition: (state, { payload }) => {
            state.transportationComposition = payload
        },
        resetTransportation: (state) => {
            state.transportation = null
        },
        setStatusFilter: (state, { payload }) => {
            state.statusFilter = payload
        },
        setDateStart: (state, { payload }) => {
            state.formationDateStart = payload ? payload.toISOString() : null
        },
        setDateEnd: (state, { payload }) => {
            state.formationDateEnd = payload ? payload.toISOString() : null
        },
    },
});

export default transportationSlice.reducer;

export const { setDraft, setTransportations, setTransportation, resetTransportation, setStatusFilter, setDateStart, setDateEnd, setComposition } = transportationSlice.actions;