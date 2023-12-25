import { createSlice } from "@reduxjs/toolkit";
import { ITransportation, IContainer } from "../models";

function formatDate(date: Date | null): string {
    if (!date) {
        return ""
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}

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
            state.transportations = payload.map((transportation: ITransportation) => ({
                ...transportation,
                creation_date: formatDate(new Date(transportation.creation_date)),
                formation_date: transportation.formation_date ? formatDate(new Date(transportation.formation_date)) : null,
                completion_date: transportation.completion_date ? formatDate(new Date(transportation.completion_date)) : null,
            }));
        },
        setTransportation: (state, { payload }) => {
            state.transportation = {
                ...payload,
                creation_date: formatDate(new Date(payload.creation_date)),
                formation_date: payload.formation_date ? formatDate(new Date(payload.formation_date)) : null,
                completion_date: payload.completion_date ? formatDate(new Date(payload.completion_date)) : null,
            }
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