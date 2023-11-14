import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyModel } from '../Models/CompanyModel';

interface CompaniesState {
			companies: CompanyModel[];
}

const initialState: CompaniesState = {
			companies: [],
};

export enum ActionType {
			GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
			GOT_SINGLE_COMPANY = "GOT_SINGLE_COMPANY",
		  ADDED_COMPANY = "ADDED_COMPANY",
		  UPDATED_COMPANY = "UPDATED_COMPANY",
		  DELETED_COMPANY = "DELETED_COMPANY",
      CLEAR_DATA = "CLEAR_DATA", 
}

const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    gotAllCompaniesAction(state, action: PayloadAction<CompanyModel[]>) {
      state.companies = action.payload;
    },
    gotSingleCompanyAction(state, action: PayloadAction<CompanyModel>) {
      state.companies.push(action.payload);
    },
    addedCompanyAction(state, action: PayloadAction<CompanyModel>) {
      state.companies.push(action.payload);
    },
    updatedCompanyACtion(state, action: PayloadAction<CompanyModel>) {
      const idx = state.companies.findIndex((company) => company.id === action.payload.id);
      state.companies[idx] = action.payload;
    },
    deletedCompanyAction(state, action: PayloadAction<number>) {
      state.companies = state.companies.filter((company) => company.id !== action.payload);
    },
    clearAllCompanyAction(state) {
      state.companies = initialState.companies;
  }
  },
});


export const {
  gotAllCompaniesAction,
  gotSingleCompanyAction,
  addedCompanyAction,
  updatedCompanyACtion,
  deletedCompanyAction,
  clearAllCompanyAction,
} = companiesSlice.actions;


export const companiesReducer = companiesSlice.reducer;
