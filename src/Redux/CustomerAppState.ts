import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerModel } from '../Models/CustomerModel';

interface CustomersState {
			customers: CustomerModel[];
}

const initialState: CustomersState = {
			customers: [],
};

export enum ActionType {
			GOT_ALL_CUSTOMER = "GOT_ALL_CUSTOMERS",
			GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
		  ADDED_CUSTOMER = "ADDED_CUSTOMER",
		  UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
		  DELETED_CUSTOMER = "DELETED_CUSTOMER",
      CLEAR_DATA = "CLEAR_DATA"
}

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    gotAllCustomersAction(state, action: PayloadAction<CustomerModel[]>) {
      state.customers = action.payload;
    },
    gotSingleCustomerAction(state, action: PayloadAction<CustomerModel>) {
      state.customers.push(action.payload);
    },
    addedCustomerAction(state, action: PayloadAction<CustomerModel>) {
      state.customers.push(action.payload);
    },
    updatedCustomerACtion(state, action: PayloadAction<CustomerModel>) {
      const idx = state.customers.findIndex((customer) => customer.id === action.payload.id);
      state.customers[idx] = action.payload;
    },
    deletedCustomerAction(state, action: PayloadAction<number>) {
      state.customers = state.customers.filter((customer) => customer.id !== action.payload);
    },
    clearAllCustomerAction(state) {
      state.customers = initialState.customers;
  }
  },
});


export const {
  gotAllCustomersAction,
  gotSingleCustomerAction,
  addedCustomerAction,
  updatedCustomerACtion,
  deletedCustomerAction,
  clearAllCustomerAction,
} = customersSlice.actions;


export const customersReducer = customersSlice.reducer;
