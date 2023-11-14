import { ClientType } from './../Models/Login';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginResModel } from '../Models/Login';

interface UserState {
    user: LoginResModel
}

const initialState: UserState = {
    user: { token: "", id: 0 ,clientType: ClientType.ADMINISTRATOR, clientName: "" }
};

export enum ActionType {
    USER_lOGGED_IN = "USER_lOGGED_IN",
    USER_LOGGED_OUT = "USER_LOGGED_OUT",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn(state, action: PayloadAction<LoginResModel>) {
            state.user = action.payload;
        },

        userLoggedOut(state) {
            state.user = initialState.user;
        },

    },
});

export const {
    userLoggedIn,
    userLoggedOut,
   } = userSlice.actions;

export const userReducer = userSlice.reducer;