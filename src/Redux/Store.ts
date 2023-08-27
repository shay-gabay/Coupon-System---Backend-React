// This is Store.ts file
import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './UserAppState';
import { guardReducer } from './GuardAppState';
import { companiesReducer } from './CompanyAppState';
import { customersReducer } from './CustomerAppState';
import { couponsReducer } from './CouponAppState';

// This is rootReducer
const rootReducer = {
   companyReducer: companiesReducer, //add-update-delete-getAll-getSingle company
   customerReducer: customersReducer, //add-update-delete-getAll-getSingle customer
   couponReducer: couponsReducer, //add-update-delete-getAll-getSingle coupon
    // userReducer: userReducer,
    // guardReducer: guardReducer,
  //  authReducer: authReducer, // login logout register
    // add more reducers here if needed
};


// This is store object
const store = configureStore({
    reducer: rootReducer
});

// Export root Application State
export type RootState = ReturnType<typeof store.getState>;

// Export store object
export default store;