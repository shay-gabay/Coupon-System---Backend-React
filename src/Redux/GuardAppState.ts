import { createSlice } from '@reduxjs/toolkit';

interface GuardState {
    isAdmin: boolean;
    isCompany: boolean;
    isCustomer: boolean;
}

const initialState: GuardState = {
    isAdmin: false,
    isCompany: false,
    isCustomer: false,
};

export enum ActionType {
    LOGGED_IN_AS_ADMIN = "LOGGED_IN_AS_ADMIN",
    LOGGED_IN_AS_COMPANY = "LOGGED_IN_AS_COMPANY",
    LOGGED_IN_AS_CUSTOMER = "LOGGED_IN_AS_CUSTOMER",
    CLEAR_DATA = "CLEAR_DATA"
}

const guardSlice = createSlice({
    name: "guard",
    initialState,
    reducers: {
        loggedInAsAdmin(state) {state.isAdmin = true;},
        loggedInAsCompany(state) {state.isCompany = true;},
        loggedInAsCustomer(state) {state.isCustomer = true;},
        removeAdminAccess(state) {state.isAdmin = initialState.isAdmin;},
        removeCompanyAccess(state) {state.isCompany = initialState.isCompany;},
        removeCustomerAccess(state) {state.isCustomer = initialState.isCustomer;},
    },
});

export const {
    loggedInAsAdmin,
    loggedInAsCompany,
    loggedInAsCustomer,
    removeAdminAccess,
    removeCompanyAccess,
    removeCustomerAccess,
  } = guardSlice.actions;

export const guardReducer = guardSlice.reducer;