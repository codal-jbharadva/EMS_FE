import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthLogin {
    authToken: string;
    id: number;
    name: string;
    isAdmin: boolean;
    email: string;
}

export interface AuthState {
    authToken: string;
    id: number;
    name: string;
    isAdmin: boolean;
    email: string;
}

const initialState: AuthState = {
    authToken: '',
    id: 0,
    name: "",
    email: "",
    isAdmin: false,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<AuthLogin>) => {
            return action.payload;
        },
        logout: (state) => {
            return initialState;
        }
    }
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
