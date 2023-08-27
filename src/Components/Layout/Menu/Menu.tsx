import { Link } from "react-router-dom";
import "./Menu.css";
import { RiHome2Line } from "react-icons/ri";
import AdminMenu from "../../Admin/AdminMenu/AdminMenu";
import CompanyMaxPriceCoupons from "../../Company/CompanyMaxPriceCoupon/CompanyMaxPriceCoupons";
import CustomerMenu from "../../Customer/CustomerMenu/CustomerMenu";
import CompanyMenu from "../../Company/CompanyMenu/CompanyMenu";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
          {/* <AdminMenu/> */}
          {/* <CompanyMenu/> */}
          {/* <CustomerMenu/> */}
            <Link to={"/home"}className="link"><button className="animated-button"><RiHome2Line/>Home</button></Link>
            {/* <Link to={"/login"}className="link"><button className="animated-button"> LogIn </button></Link> */}
            {/* <Link to={"/logout"}className="link"><button className="animated-button"> LogOut </button></Link> */}
            {/* <Link to={"/register"}className="link"><button className="animated-button"> Register </button></Link> */}
            <Link to={"/admin"}className="link"><button className="animated-button">Admin Menu</button></Link>
            <Link to={"/company"}className="link"><button className="animated-button">Company Menu</button></Link>
            <Link to={"/customer"} className="link"><button className="animated-button">Customer Menu</button></Link>
            {/* <Link to={"/about"}>About</Link> */}
            {/* <Link to={"/couponList"}>company</Link> */}
        </div>
    );
}

export default Menu;
