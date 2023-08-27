//This is TaksAppState.ts file
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CompanyModel } from '../Models/CompanyModel';

//This is the Contract
interface CompaniesState {
			companies: CompanyModel[];
}

//This is the initialized Task Applicaiton State - initialize within empty array
const initialState: CompaniesState = {
			companies: [],
};

//These are all possible actions
export enum ActionType {
			GOT_ALL_COMPANIES = "GOT_ALL_COMPANIES",
			GOT_SINGLE_COMPANY = "GOT_SINGLE_COMPANY",
		  ADDED_COMPANY = "ADDED_COMPANY",
		  UPDATED_COMPANY = "UPDATED_COMPANY",
		  DELETED_COMPANY = "DELETED_COMPANY",
}

//This is tasksSlice
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
      const idx = state.companies.findIndex((company) => company.id === action.payload.id
      );
      state.companies[idx] = action.payload;
    },
    deletedCompanyAction(state, action: PayloadAction<number>) {
      state.companies = state.companies.filter((company) => company.id !== action.payload);
    },
  },
});


//This is the exported tasks
export const {
  gotAllCompaniesAction,
  gotSingleCompanyAction,
  addedCompanyAction,
  updatedCompanyACtion,
  deletedCompanyAction,
} = companiesSlice.actions;


//Export the reducer
export const companiesReducer = companiesSlice.reducer;
