import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gotSingleCouponAction } from "../../../Redux/CouponAppState";
import store, { RootState } from "../../../Redux/Store";
import { useSelector } from "react-redux";

function CustomerSingleCoupon(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel>();
  const [couponId, setCouponId] = useState<number>(0);
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const headers = { 'Authorization': store.getState().userReducer.user.token };
  const customerName = useSelector((state:RootState)=>state.userReducer.user.clientName)
  
  const handleSubmit = () => {
    axios
      .get<CouponModel>(
        `${urlService.customer}/${id}/coupons/${couponId}`,{headers})
      .then((res) => {
        setCoupon(res.data);
        dispatch(gotSingleCouponAction(res.data));
      })
      .catch((err) => notifyService.showErrorNotification(err));
  };

  return (
    <div className="content">
      <h1 className="h1">Customer Single Coupon</h1>
      <div className="CustomerCoupons">
          <div>
            <p>
              Name: {customerName} 
            </p>
          </div>
      </div>

      <div className="input company-card">
        <h2>Please insert the coupon id </h2>
        <input
          className="input-window"
          type="number"
          min="1"
          placeholder="ID..."
          value={couponId}
          onChange={(e) => {
            setCouponId(Number(e.target.value));
          }}
        />
        <button className="submit" onClick={handleSubmit}>
          Apply
        </button>
      </div>
       {coupon && <CardB coupon={coupon} date={undefined} /> }
    </div>
  );
}

export default CustomerSingleCoupon;
