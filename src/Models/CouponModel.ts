import { CompanyModel } from "./CompanyModel";

export enum CouponCategory {
FOOD = "FOOD",
HEALTH = "HEALTH",
SPORT = "SPORT",
COMPUTER = "COMPUTER",
VACATION = "VACATION",
CLOTHING = "CLOTHING",
}

  export interface CouponModel {
  id: number;
  company: CompanyModel;
  // customerId: number;
  category: CouponCategory; 
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  amount: number;
  price: number;
  image: string;
}
