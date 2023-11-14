import { useEffect, useState } from "react";
import "./CustomerCoupons.css";
import CardB from "../../Shared/Card/cardB";
// import CustomerCard from "../../Shared/Card/CustomerCard";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { useParams } from "react-router-dom";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useDispatch } from "react-redux";
import { gotCustomerCouponsAction } from "../../../Redux/CouponAppState";
import { gotSingleCustomerAction } from "../../../Redux/CustomerAppState";
import store, { RootState } from "../../../Redux/Store";
import { useSelector } from "react-redux";

function CustomerCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const headers = { 'Authorization': store.getState().userReducer.user.token };
  const customerName = useSelector((state:RootState)=>state.userReducer.user.clientName)
  

  useEffect(() => {
    axios
      .get<CouponModel[]>(`${urlService.customer}/${id}/coupons`,{headers})
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
        dispatch(gotCustomerCouponsAction(res.data))
      })
      .catch((err) => console.log(err.data));
}, []);

  return (
    <div className="content">
      <h1 className="h1">Customer Coupons</h1>
      <div className="CustomerCoupons">
         <p>Customer Name: {customerName} </p>
       </div>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      ))}
    </div>
  );
}

export default CustomerCoupons;
