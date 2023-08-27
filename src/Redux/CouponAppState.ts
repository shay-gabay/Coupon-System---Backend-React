//This is TaksAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponModel } from '../Models/CouponModel';

//This is the Contract
interface CouponsState {
			coupons: CouponModel[];
}

//This is the initialized Task Applicaiton State - initialize within empty array
const initialState: CouponsState = {
			coupons: [],
};

//These are all possible actions
export enum ActionType {
			GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
			GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
		  ADDED_COUPON = "ADDED_COUPON",
		  UPDATED_COUPON = "UPDATED_COUPON",
		  DELETED_COUPON = "DELETED_COUPON",
}

//This is tasksSlice
const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    gotAllCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    },
    gotSingleCouponAction(state, action: PayloadAction<CouponModel>) {
      state.coupons.push(action.payload);
    },
    addedCouponAction(state, action: PayloadAction<CouponModel>) {
      state.coupons.push(action.payload);
    },
    updatedCouponACtion(state, action: PayloadAction<CouponModel>) {
      const idx = state.coupons.findIndex((coupon) => coupon.id === action.payload.id);
      state.coupons[idx] = action.payload;
    },
    deletedCouponAction(state, action: PayloadAction<number>) {
      state.coupons = state.coupons.filter((coupon) => coupon.id !== action.payload);
    },
  },
});


//This is the exported tasks
export const {
  gotAllCouponsAction,
  gotSingleCouponAction,
  addedCouponAction,
  updatedCouponACtion,
  deletedCouponAction,
} = couponsSlice.actions;


//Export the reducer
export const couponsReducer = couponsSlice.reducer;
