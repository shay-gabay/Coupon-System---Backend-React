import { Link } from "react-router-dom";
import "./CompanyMenu.css";
import { useEffect, useState } from "react";
// import { RiCouponLine } from "react-icons/ri";
// import { RiCoupon2Fill } from "react-icons/ri";
// import { RiCoupon2Line } from "react-icons/ri";
import { RiCoupon4Fill } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { RiCoupon4Line } from "react-icons/ri";
import { ImPriceTag } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";

function CompanyMenu(): JSX.Element {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true); // Trigger fadeIn animation
  }, []);
  return (
    <div className={`fade ${fadeIn ? "fade-in" : "fade-out"}`}>
      <div className="AdminMenu">
        <h1>Company Menu</h1>
        <Link to={"/AddCoupon"} className="link">
          <RiAddBoxLine /> Add Coupon
        </Link>
        <Link to={"/UpdateCoupon"} className="link">
          <RxUpdate /> Update Coupon
        </Link>
        <Link to={"/DeleteCoupon"} className="link">
          <RiDeleteBin5Fill /> Delete Coupon
        </Link>
        <Link to={"/CompanyCoupons"} className="link">
          <RiCoupon4Fill /> Company's Coupons
        </Link>
        <Link to={"/CompanySingleCoupon"} className="link">
          <RiCoupon4Line /> Company's Single Coupons
        </Link>
        <Link to={"/CompanyMaxPriceCoupons"} className="link">
          <ImPriceTag /> Company's Max Price Coupons
        </Link>
        <Link to={"/CompanyCategoryCoupons"} className="link">
          <BiSolidCategory /> Company's Category Coupons
        </Link>
        <Link to={"/CompanyDetails"} className="link">
          <TbListDetails /> Company Details
        </Link>
        <img className="img" src="/src/assets/Images/Company.jpg" />
      </div>
    </div>
  );
}

export default CompanyMenu;
