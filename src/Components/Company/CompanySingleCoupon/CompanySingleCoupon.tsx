import "./CompanySingleCoupon.css";
import { useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import notifyService from "../../../Services/NotificationService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gotSingleCouponAction } from "../../../Redux/CouponAppState";
import webApiService from "../../../Services/WebApiService";
import { RootState } from "../../../Redux/Store";

function CompanySingleCoupon(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel>();
  const [couponId, setCouponId] = useState<number>();
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const companyName =useSelector((state:RootState)=>state.userReducer.user.clientName)

  const handleSubmit = () => {
    webApiService.getSingleCoupon(id,couponId)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      dispatch(gotSingleCouponAction(res.data))
      })
      .catch((err) => notifyService.showErrorNotification(err));
  };

  return (
    <div className="content">
      <h1 className="h1">Company's Single Coupon</h1>
      <div className="CustomerCoupons input">
          <div> Company Name: {companyName} </div>
      </div>
      <div className="input company-card">
        <h2>Please insert the coupon id </h2>
        <input className="input-window" type="number" min="1" placeholder="ID..." value={couponId} 
        onChange={(e) => {setCouponId(Number(e.target.value)); }}/>
        <button className="submit" onClick={handleSubmit}> Apply </button>
      </div> 
        {coupon && <CardB coupon={coupon} />}
    </div>
  );
}

export default CompanySingleCoupon;
