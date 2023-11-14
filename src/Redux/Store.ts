// This is Store.ts file
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './UserAppState';
import { guardReducer } from './GuardAppState';
import { companiesReducer } from './CompanyAppState';
import { customersReducer } from './CustomerAppState';
import { couponsReducer } from './CouponAppState';

const rootReducer = {
   companyReducer: companiesReducer, 
   customerReducer: customersReducer, 
   couponReducer: couponsReducer, 
   userReducer: userReducer,
    guardReducer: guardReducer,
};

const store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof store.getState>;

export default store;