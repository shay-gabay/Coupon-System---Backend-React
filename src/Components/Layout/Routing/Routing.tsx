import { Route, Routes } from "react-router-dom";
import "./Routing.css";
import App from "../../../App";
import Home from "../../Pages/Home/Home";
import About from "../../Pages/About/About";
import Page404 from "../../Pages/Page404/Page404";
import AllCoupons from "../../Admin/AllCoupons/AllCoupons";
import CompanyList from "../../Admin/CompanyList/CompanyList";
import CustomerList from "../../Admin/CustomerList/CustomerList";
import CompanyPic from "../../Company/CompanyMenu/CompanyPic";
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
import Login from "../../Auth/Login/Login";
import Logout from "../../Auth/Logout/Logout";
import AdminPic from "../../Admin/AdminMenu/AdminPic";
import CustomerPic from "../../Customer/CustomerMenu/CustomerPic";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

function Routing(): JSX.Element {
  const isAdmin = useSelector((state:RootState)=>state.guardReducer.isAdmin);
  const isCompany = useSelector((state:RootState)=>state.guardReducer.isCompany);
  const isCustomer = useSelector((state:RootState)=>state.guardReducer.isCustomer);
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
        <Route path="/authMenu" element={<AuthMenu />} />

       {isAdmin && <Route path="/Admin" element={<AdminPic />} /> }
       {isAdmin &&  <Route path="/AddCompany" element={<AddCompany />} /> }
       {isAdmin &&  <Route path="/UpdateCompany/:id" element={<UpdateCompany />} /> }
       {isAdmin &&  <Route path="/DeleteCompany/:id" element={<DeleteCompany />} /> }
       {isAdmin &&  <Route path="/CompanyList" element={<CompanyList />} /> }
       {isAdmin && <Route path="/SingleCompany/:id" element={<SingleCompany />} /> }
       {isAdmin &&  <Route path="/AddCustomer" element={<AddCustomer />} /> }
       {isAdmin &&  <Route path="/UpdateCustomer/:id" element={<UpdateCustomer />} /> }
       {isAdmin && <Route path="/DeleteCustomer/:id" element={<DeleteCustomer />} /> }
       {isAdmin && <Route path="/CustomerList" element={<CustomerList />} /> }
       {isAdmin &&  <Route path="/SingleCustomer/:id" element={<SingleCustomer />} /> }
       {isAdmin &&  <Route path="/AllCoupons" element={<AllCoupons />} /> }


       {isCompany && <Route path="/Company" element={<CompanyPic />} /> }
       {isCompany && <Route path="/AddCoupon/:id" element={<AddCoupon />} /> }
       {isCompany && <Route path="/UpdateCoupon/:id/:couponId" element={<UpdateCoupon/>}/> }
       {isCompany && <Route path="/DeleteCoupon/:id" element={<DeleteCoupon/>}/> }
       {isCompany && <Route path="/CompanyCoupons/:id" element={<CompanyCoupons/>}/> }
       {isCompany && <Route path="/CompanySingleCoupon/:id" element={<CompanySingleCoupon/>}/> }
       {isCompany && <Route path="/CompanyMaxPriceCoupons/:id" element={<CompanyMaxPriceCoupons/>}/> }
       {isCompany && <Route path="/CompanyCategoryCoupons/:id" element={<CompanyCategoryCoupons/>}/> }
       {isCompany && <Route path="/CompanyDetails/:id" element={<CompanyDetails />} /> }
 
       {isCustomer &&  <Route path="/Customer" element={<CustomerPic />} /> }
       {isCustomer &&  <Route path="/CouponList/:id" element={<CouponList />} /> }
       {isCustomer &&  <Route path="/CustomerCoupons/:id" element={<CustomerCoupons/>}/> }
       {isCustomer &&  <Route path="/CustomerSingleCoupon/:id" element={<CustomerSingleCoupon/>}/> }
       {isCustomer &&  <Route path="/CustomerMaxPriceCoupons/:id" element={<CustomerMaxPriceCoupons/>}/> }
       {isCustomer &&  <Route path="/CustomerCategoryCoupons/:id" element={<CustomerCategoryCoupons/>}/> }
       {isCustomer &&  <Route path="/CustomerDetails/:id" element={<CustomerDetails />} /> }

      </Routes>
    </div>
  );
}

export default Routing;
