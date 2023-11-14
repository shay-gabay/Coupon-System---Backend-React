import "./AllCoupons.css";
import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import notifyService from "../../../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { gotAllCouponsAction } from "../../../Redux/CouponAppState";
import store, { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";

function AllCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const total = useSelector((state: RootState) => state.couponReducer.coupons.length)
  const dispatch = useDispatch();
  useEffect(() => {
     webApiService.getAllCoupons()
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
        dispatch(gotAllCouponsAction(res.data))
    
      })
      .catch((err) => {
        notifyService.showErrorNotification(err.data)});
}, []);

return (
    <div className="content">
      <h1 className="h1">All Companies Coupons</h1>
      <p className="total B company-card">Total Coupons : { total ? <span>{total}</span> : <span>No Values</span> }</p>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      ))}
    </div>
  );
}

export default AllCoupons;
