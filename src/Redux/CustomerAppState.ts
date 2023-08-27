//This is TaksAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerModel } from '../Models/CustomerModel';

//This is the Contract
interface CustomersState {
			customers: CustomerModel[];
}

//This is the initialized customer Application State - initialize within empty array
const initialState: CustomersState = {
			customers: [],
};

//These are all possible actions
export enum ActionType {
			GOT_ALL_CUSTOMER = "GOT_ALL_CUSTOMERS",
			GOT_SINGLE_CUSTOMER = "GOT_SINGLE_CUSTOMER",
		  ADDED_CUSTOMER = "ADDED_CUSTOMER",
		  UPDATED_CUSTOMER = "UPDATED_CUSTOMER",
		  DELETED_CUSTOMER = "DELETED_CUSTOMER",
}

//This is customersSlice
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
  },
});


//This is the exported customers
export const {
  gotAllCustomersAction,
  gotSingleCustomerAction,
  addedCustomerAction,
  updatedCustomerACtion,
  deletedCustomerAction,
} = customersSlice.actions;


//Export the reducer
export const customersReducer = customersSlice.reducer;
