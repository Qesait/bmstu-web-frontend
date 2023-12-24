import { PayloadAction, createSlice } from "@reduxjs/toolkit";

enum Role {
    NotAuthorized = 0,
    Customer = 1,
    Moderator = 2,
}

interface authorizationState {
    role: Role
}

const initialState: authorizationState = {
    role: Role.NotAuthorized,
}

const authorizationSlice = createSlice({
    name: 'containerFilter',
    initialState,
    reducers: {
        setRole: (state, action: PayloadAction<Role>) => {
            state.role = action.payload
        },
    },
});

export default authorizationSlice.reducer;

export const { setRole } = authorizationSlice.actions;