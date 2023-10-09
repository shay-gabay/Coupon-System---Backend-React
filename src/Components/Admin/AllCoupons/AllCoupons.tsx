import "./AllCoupons.css";
import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
// import { CompanyModel } from "../../../Models/CompanyModel";
import notifyService from "../../../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { couponsReducer, gotAllCouponsAction } from "../../../Redux/CouponAppState";
import { RootState } from "../../../Redux/Store";

function CompanyCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const total = useSelector((state: RootState) => state.couponReducer.coupons.length)
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get<CouponModel[]>(`${urlService.customer}/coupons`)
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
      <p className="total B company-card">Total Coupons : { total ? <span>{total}</span> : <span>no values</span> }</p>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} />
      ))}
    </div>
  );
}

export default CompanyCoupons;
