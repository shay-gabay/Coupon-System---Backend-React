import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import App from "../../../App";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import AdminMenu from "../../Admin/AdminMenu/AdminMenu";
import AllCoupons from "../../Admin/AllCoupons/AllCoupons";
import CompanyList from "../../Admin/CompanyList/CompanyList";
import CustomerList from "../../Admin/CustomerList/CustomerList";
import CompanyMenu from "../../Company/CompanyMenu/CompanyMenu";
import CustomerMenu from "../../Customer/CustomerMenu/CustomerMenu";
import CouponList from "../../Customer/CouponList/CouponList";
import SingleCompany from "../../Admin/SingleCompany/SingleCompany";
import SingleCustomer from "../../Admin/SingleCustomer/SingleCustomer";
import CompanyDetails from "../../Company/CompanyDetails/CompanyDetails";
import CustomerDetails from "../../Customer/CustomerDetails/CustomerDetails";
import AddCompany from "../../Admin/AddCompany/AddCompany";
import UpdateCompany from "../../Admin/UpdateCompany/UpdateCompany";
import DeleteCompany from "../../Admin/DeleteCompany/DeleteCompany";
import DeleteCustomer from "../../Admin/DeleteCustomer/DeleteCustomer";
import AddCustomer from "../../Admin/AddCustomer/AddCustomer";
import UpdateCustomer from "../../Admin/UpdateCustomer/UpdateCustomer";
import AddCoupon from "../../Company/AddCoupon/AddCoupon";
import DeleteCoupon from "../../Company/DeleteCoupon/DeleteCoupon";
import CompanyCoupons from "../../Company/CompanyCoupons/CompanyCoupons";
import CompanySingleCoupon from "../../Company/CompanySingleCoupon/CompanySingleCoupon";
import CompanyMaxPriceCoupons from "../../Company/CompanyMaxPriceCoupon/CompanyMaxPriceCoupons";
import CompanyCategoryCoupons from "../../Company/CompanyCategoryCoupons/CompanyCategoryCoupons";
import UpdateCoupon from "../../Company/UpdateCoupon/UpdateCoupon";
import CustomerCoupons from "../../Customer/CustomerCoupons/CustomerCoupons";
import CustomerSingleCoupon from "../../Customer/CustomerSingleCoupon/CustomerSingleCoupon";
import CustomerMaxPriceCoupons from "../../Customer/CustomerMaxPriceCoupons/CustomerMaxPriceCoupons";
import CustomerCategoryCoupons from "../../Customer/CustomerCategoryCoupons/CustomerCategoryCoupons";
import AuthMenu from "../../Auth/AuthMenu/AuthMenu";
import Register from "../../Auth/Register/Register";
import Login from "../../Auth/Login/Login";
import Logout from "../../Auth/Logout/Logout";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route index element={<Home />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/authMenu" element={<AuthMenu />} />

        <Route path="/Admin" element={<AdminMenu />} />
        <Route path="/AddCompany" element={<AddCompany />} />
        <Route path="/UpdateCompany" element={<UpdateCompany />} />
        <Route path="/DeleteCompany" element={<DeleteCompany />} />
        <Route path="/Admin/CompanyList" element={<CompanyList />} />
        <Route path="/SingleCompany" element={<SingleCompany />} />
        <Route path="/AddCustomer" element={<AddCustomer />} />
        <Route path="/UpdateCustomer" element={<UpdateCustomer />} />
        <Route path="/DeleteCustomer" element={<DeleteCustomer />} />
        <Route path="/Admin/CustomerList" element={<CustomerList />} />
        <Route path="/SingleCustomer" element={<SingleCustomer />} />
        <Route path="/AllCoupons" element={<AllCoupons />} />


        <Route path="/Company" element={<CompanyMenu />} />
        <Route path="/AddCoupon" element={<AddCoupon />} />
        <Route path="/UpdateCoupon" element={<UpdateCoupon/>}/>
        <Route path="/DeleteCoupon" element={<DeleteCoupon/>}/>
        <Route path="/CompanyCoupons" element={<CompanyCoupons/>}/>
        <Route path="/CompanySingleCoupon" element={<CompanySingleCoupon/>}/>
        <Route path="/CompanyMaxPriceCoupons" element={<CompanyMaxPriceCoupons/>}/>
        <Route path="/CompanyCategoryCoupons" element={<CompanyCategoryCoupons/>}/>
        <Route path="/CompanyDetails" element={<CompanyDetails />} />
 
        <Route path="/Customer" element={<CustomerMenu />} />
        <Route path="/CouponList" element={<CouponList />} />
        <Route path="/CustomerCoupons" element={<CustomerCoupons/>}/>
        <Route path="/CustomerSingleCoupon" element={<CustomerSingleCoupon/>}/>
        <Route path="/CustomerMaxPriceCoupons" element={<CustomerMaxPriceCoupons/>}/>
        <Route path="/CustomerCategoryCoupons" element={<CustomerCategoryCoupons/>}/>
        <Route path="/CustomerDetails" element={<CustomerDetails />} />

      </Routes>
    </div>
  );
}

export default Routing;
