import axios, { AxiosResponse } from 'axios';
import urlService from './UrlService';
import { LoginReqModel, LoginResModel } from '../Models/Login';
import { RegisterReqModel } from '../Models/Register';
import { CompanyModel } from '../Models/CompanyModel';
import { CustomerModel } from '../Models/CustomerModel';
import { CouponModel } from '../Models/CouponModel';
import store from '../Redux/Store';

class WebApiService {

    // Admin  
    public addCompany(company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.post<CompanyModel>(`${urlService.admin}/company`,company, { headers });
    }
    public addCustomer(customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.post<CustomerModel>(`${urlService.admin}/customer`,customer, { headers });
    }
    public updateCompany(id: number, company: CompanyModel): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        console.log(headers)
        return axios.put<CompanyModel>(`${urlService.admin}/company/${id}`,company, { headers });    
    }
    public updateCustomer(id: number, customer: CustomerModel): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.put<CustomerModel>(`${urlService.admin}/customer/${id}`,customer, { headers });    
    }
    public deleteCompany(companyId: number): Promise<AxiosResponse<CompanyModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.delete<CompanyModel>(`${urlService.admin}/company/${companyId}`, { headers })
    }
    public deleteCustomer(customerId: number): Promise<AxiosResponse<CustomerModel>> {
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.delete<CustomerModel>(`${urlService.admin}/customer/${customerId}`, { headers })
    }    
    public getAllCompanies(): Promise<AxiosResponse<CompanyModel[]>>{
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<CompanyModel[]>(`${urlService.admin}/company`, { headers });
    }
    public getAllCustomers(): Promise<AxiosResponse<CustomerModel[]>>{
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<CustomerModel[]>(`${urlService.admin}/customer`, { headers });
    }
    public getAllCoupons(): Promise<AxiosResponse<CouponModel[]>>{
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<CouponModel[]>(`${urlService.customer}/coupons`, { headers });
    }
    public getSingleCompany(id:number): Promise<AxiosResponse<CompanyModel>>{
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<CompanyModel>(`${urlService.admin}/company/${id}`, { headers });
    }
    public getSingleCustomer(id:number): Promise<AxiosResponse<CustomerModel>>{
        const headers = { 'Authorization': store.getState().userReducer.user.token };
        return axios.get<CustomerModel>(`${urlService.admin}/customer/${id}`, { headers });
    }


// Company 
public addCoupon(id:number, coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
    const headers = { 'Authorization': store.getState().userReducer.user.token };
    return axios.post<CouponModel>(`${urlService.company}/${id}/coupons`, coupon, { headers }) 
}
public updateCoupon(id: number,couponId: number, coupon: CouponModel): Promise<AxiosResponse<CouponModel>> {
    const headers = { 'Authorization': store.getState().userReducer.user.token };
    return axios.put<CouponModel>(`${urlService.company}/${id}/coupon/${couponId}`,coupon, { headers });    
}
public deleteCoupon(companyId: number,couponId: number): Promise<AxiosResponse<CouponModel>> {
    const headers = { 'Authorization': store.getState().userReducer.user.token };
    return axios.delete<CouponModel>(`${urlService.company}/${companyId}/coupons/${couponId}`, { headers })
}
public getSingleCoupon(companyId: number ,couponId:number): Promise<AxiosResponse<CouponModel>>{
    const headers = { 'Authorization': store.getState().userReducer.user.token };
    return axios.get<CouponModel>(`${urlService.company}/${companyId}/coupons/${couponId}`, { headers });
}
public getAllCompanyCoupons(companyId: number): Promise<AxiosResponse<CouponModel[]>>{
    const headers = { 'Authorization': store.getState().userReducer.user.token };
    return axios.get<CouponModel[]>(`${urlService.company}/${companyId}/coupons`, { headers });
}
public getCompanyDetails(companyId:number): Promise<AxiosResponse<CompanyModel>>{
    const headers = { 'Authorization': store.getState().userReducer.user.token };
    return axios.get<CompanyModel>(`${urlService.company}/${companyId}`, { headers });
}



// Auth
public login(data: LoginReqModel): Promise<AxiosResponse<LoginResModel>> {
    return axios.post<LoginResModel>(urlService.auth + "/login", data);
}
public register(data: RegisterReqModel): Promise<AxiosResponse<any>> {
    return axios.post<any>(urlService.auth + "/register", data);
}

}

const webApiService = new WebApiService();
export default webApiService;