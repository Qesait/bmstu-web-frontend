import { createSlice } from "@reduxjs/toolkit";

interface userState {
    login: string | null
    role: string
}

const initialState: userState = {
    login: null,
    role: '0'
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLogin: (state, { payload }) => {
            state.login = payload
        },
        resetLogin: (state) => {
            state.login = null
        },
        setRole: (state, { payload }) => {
            state.role = payload
        },
        resetRole: (state) => {
            state.login = null
        },
    },
});

export default userSlice.reducer;

export const { setLogin, resetLogin, setRole, resetRole } = userSlice.actions;