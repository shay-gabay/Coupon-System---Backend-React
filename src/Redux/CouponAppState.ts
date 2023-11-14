import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CouponModel } from '../Models/CouponModel';

interface CouponsState {
			coupons: CouponModel[];
}

const initialState: CouponsState = {
			coupons: [],
};

export enum ActionType {
			GOT_ALL_COUPONS = "GOT_ALL_COUPONS",
			GOT_COMPANY_COUPONS = "GOT_ALL_COUPONS",
			GOT_CUSTOMER_COUPONS = "GOT_ALL_COUPONS",
			GOT_CUSTOMER_COUPONS_NOT_PURCHASE = "GOT_ALL_COUPONS_NOT_PURCHASE",
			GOT_SINGLE_COUPON = "GOT_SINGLE_COUPON",
		  GOT_COMPANY_MAX_PRICE_COUPONS = " GOT_COMPANY_MAX_PRICE_COUPONS",
		  GOT_CUSTOMER_MAX_PRICE_COUPONS = " GOT_CUSTOMER_MAX_PRICE_COUPONS",
		  GOT_COMPANY_CATEGORY_COUPONS = " GOT_COMPANY_CATEGORY_COUPONS",
		  GOT_CUSTOMER_CATEGORY_COUPONS = " GOT_CUSTOMER_CATEGORY_COUPONS",
      CUSTOMER_PURCHASE_COUPON = "CUSTOMER_PURCHASE_COUPON",
      ADDED_COUPON = "ADDED_COUPON",
		  UPDATED_COUPON = "UPDATED_COUPON",
		  DELETED_COUPON = "DELETED_COUPON",
      CLEAR_DATA = "CLEAR_DATA"

}

const couponsSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    gotAllCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    },  
    gotCompanyCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    },  
    gotCustomerCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    },
    gotCustomerCouponsNotPurchaseAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    },
    gotSingleCouponAction(state, action: PayloadAction<CouponModel>) {
      state.coupons.push(action.payload);
    }, 
    gotCompanyMaxPriceCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    }, 
    gotCustomerMaxPriceCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    }, 
    gotCompanyCategoryCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    }, 
    gotCustomerCategoryCouponsAction(state, action: PayloadAction<CouponModel[]>) {
      state.coupons = action.payload;
    },
    customerPurchaseCouponsAction(state, action: PayloadAction<CouponModel>) {
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
    clearAllCouponsAction(state) {
      state.coupons = initialState.coupons;
  }
  },
});


export const {
  gotAllCouponsAction,
  gotCompanyCouponsAction,
  gotCustomerCouponsAction,
  gotSingleCouponAction,
  gotCompanyMaxPriceCouponsAction,
  gotCustomerMaxPriceCouponsAction,
  gotCompanyCategoryCouponsAction,
  gotCustomerCategoryCouponsAction,
  gotCustomerCouponsNotPurchaseAction,
  customerPurchaseCouponsAction,
  addedCouponAction,
  updatedCouponACtion,
  deletedCouponAction,
  clearAllCouponsAction,
} = couponsSlice.actions;


export const couponsReducer = couponsSlice.reducer;
