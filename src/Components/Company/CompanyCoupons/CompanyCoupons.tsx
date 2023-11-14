import "./CompanyCoupons.css";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import notifyService from "../../../Services/NotificationService";
import { gotCompanyCouponsAction } from "../../../Redux/CouponAppState";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CardC from "../../Shared/Card/CardC";
import { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";

function CompanyCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const companyName =useSelector((state:RootState)=>state.userReducer.user.clientName)


  useEffect(() => {
    webApiService.getAllCompanyCoupons(id)
      .then((res) => {
        setCoupon(res.data);
        dispatch(gotCompanyCouponsAction(res.data))
      })
      .catch((err) => {
        notifyService.showErrorNotification(err.data)});
}, []);

  return (
    <div className="content">
      <h1 className="h1">Company's Coupons</h1>
      <div className="CustomerCoupons">
      <p>Company Name: {companyName}</p>
      </div>
      <p >{!(coupon.length==0) ? 
      <p>
        {coupon.map((coupon, idx) => (
        <CardC key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      ))}
      </p> : <p className="CustomerCoupons input">No Values</p>}</p>
    </div>
  );
}

export default CompanyCoupons;
