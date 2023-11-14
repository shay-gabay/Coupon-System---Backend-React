import { Link, useParams } from "react-router-dom";
import "./CompanyMenu.css";
import { useEffect, useState } from "react";
import { RiCoupon4Fill } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RxUpdate } from "react-icons/rx";
import { RiCoupon4Line } from "react-icons/ri";
import { ImPriceTag } from "react-icons/im";
import { BiSolidCategory } from "react-icons/bi";
import { TbListDetails } from "react-icons/tb";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { VscGithubAction } from "react-icons/vsc";

function CompanyMenu(): JSX.Element {
  const [fadeIn, setFadeIn] = useState(false);
  const params = useParams(); 
  const id =useSelector((state:RootState)=>state.userReducer.user.id)
  const couponId = +(params.couponId || 0);
  const [showMoreActions, setShowMoreActions] = useState(false);
  
  useEffect(() => {
    setFadeIn(true); 
  }, []);


  const toggleMoreActions = () => {
    setShowMoreActions(!showMoreActions);
  };

  return (
    <div className={`fade ${fadeIn ? "fade-in" : "fade-out"}`}>
      <div className="AdminMenu">
        <h1>Company Menu</h1>
        <Link to={`/AddCoupon/${id}`} className="link"><RiAddBoxLine /> Add Coupon </Link>

        {/* <p onClick={toggleMoreActions} className="more-actions link"><VscGithubAction/>More Actions</p>
        {showMoreActions && (
          <div className="more-actions-menu"> */}
        <Link to={`/UpdateCoupon/${id}/${couponId}`} className="link"><RxUpdate /> Update Coupon </Link>
        <Link to={`/DeleteCoupon/${id}`} className="link"><RiDeleteBin5Fill /> Delete Coupon </Link>
        <Link to={`/CompanyCoupons/${id}`} className="link"><RiCoupon4Fill /> Company's Coupons </Link>
        <Link to={`/CompanySingleCoupon/${id}`} className="link"><RiCoupon4Line /> Company's Single Coupons </Link>
        <Link to={`/CompanyMaxPriceCoupons/${id}`} className="link"><ImPriceTag /> Company's Max Price Coupons </Link>
        <Link to={`/CompanyCategoryCoupons/${id}`} className="link"><BiSolidCategory /> Company's Category Coupons </Link>
        <Link to={`/CompanyDetails/${id}`} className="link"><TbListDetails /> Company Details </Link>
      {/* </div>)} */}
      </div>
    </div>
 );
}

export default CompanyMenu;
