import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CustomerMenu.css";
import { GiMoneyStack } from "react-icons/gi";
import { TbListDetails } from "react-icons/tb";
import { RiCoupon4Fill } from "react-icons/ri";
import { RiCoupon4Line } from "react-icons/ri";
import { ImPriceTag } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";

function CustomerMenu(): JSX.Element {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true); // Trigger fadeIn animation
  }, []);
  
  return (
    <div className={`fade ${fadeIn ? "fade-in" : "fade-out"}`}>
<div className="AdminMenu">
      <h1>Customer Menu</h1>
      <Link to={"/CouponList"} className="link">
        <GiMoneyStack /> Purchase Coupon
      </Link>
      <Link to={"/CustomerCoupons"} className="link">
        <RiCoupon4Fill /> Customer Coupons
      </Link>
      <Link to={"/CustomerSingleCoupon"} className="link">
        <RiCoupon4Line /> Customer Single Coupon
      </Link>
      <Link to={"/CustomerMaxPriceCoupons"} className="link">
        <ImPriceTag /> Customer Max Price Coupons
      </Link>
      <Link to={"/CustomerCategoryCoupons"} className="link">
        <BiSolidCategory /> Customer Category Coupons
      </Link>
      <Link to={"/CustomerDetails"} className="link">
        <TbListDetails /> Customer Details
      </Link>
      <img className="img" src="/src/assets/Images/Customer.jpg" />
    </div>
    </div>
  );
}

export default CustomerMenu;
