// import { string } from "zod";

export interface LoginReqModel{
    clientType : ClientType; 
    email: string;
    password: string;
}

export interface LoginResModel{
    token: string;
    id: number;
    clientType : ClientType; 
    clientName : string; 

}

export enum ClientType{
    ADMINISTRATOR = "ADMINISTRATOR",
    COMPANY = "COMPANY",
    CUSTOMER = "CUSTOMER",
}
