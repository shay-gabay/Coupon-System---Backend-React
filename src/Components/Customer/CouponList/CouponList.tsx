import "./CouponList.css";
import { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import CouponCard from "../../Shared/Card/CouponCard";
import urlService from "../../../Services/UrlService";
import { useNavigate } from "react-router-dom";

function CouponList(): JSX.Element {
  const customerId = 2;
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  useEffect(() => {
    axios
      .get<CouponModel[]>(`${urlService.customer}/${customerId}/customerCouponsNotPurchased`)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => console.log(err.data));
  }, []);

  if (coupon.length === 0) {
    return (
      <div className="h1">
        <h1 >Coupons List</h1>
        <h1 className="text">*** You Have No coupons Left To Purchase ***</h1>
      </div>
    );
  }

  return (
    <div className="content">
      <h1 className="h1">Coupons List</h1>
      {coupon.map((coupon, idx) => (
        <CouponCard key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      ))}
    </div>
  );
}

export default CouponList;
