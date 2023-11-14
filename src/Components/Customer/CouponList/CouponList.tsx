import "./CouponList.css";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import CouponCard from "../../Shared/Card/CouponCard";
import urlService from "../../../Services/UrlService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gotCustomerCouponsNotPurchaseAction } from "../../../Redux/CouponAppState";
import store from "../../../Redux/Store";

function CouponList(): JSX.Element {
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const headers = { 'Authorization': store.getState().userReducer.user.token };
 
  useEffect(() => {
    if (coupon.length > 0) {
      return; }
      axios.get<CouponModel[]>(`${urlService.customer}/${id}/customerCouponsNotPurchased`,{headers})
      .then((res) => {
        dispatch(gotCustomerCouponsNotPurchaseAction(res.data));
        setCoupon(res.data);
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <div className="content">
      <h1 className="h1">Coupons List</h1>
       {!(coupon.length===0) ?  coupon.map((coupon, idx) => (
        <CouponCard key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      )) :  <h1 className="text company-card input">* * * You Have No coupons Left To Purchase * * *</h1>} 
    </div>
  );
}

export default CouponList;
