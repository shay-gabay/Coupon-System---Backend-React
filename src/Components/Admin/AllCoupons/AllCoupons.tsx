import "./AllCoupons.css";
import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { CompanyModel } from "../../../Models/CompanyModel";
import notifyService from "../../../Services/NotificationService";

function CompanyCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const [couponsCount,setCouponsCount] = useState<number>();
  
  const companyId=1

  useEffect(() => {
    axios
      .get<CouponModel[]>(`${urlService.customer}/coupons`)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => {
        notifyService.showErrorNotification(err.data)});
}, []);

axios.get<number>(`${urlService.admin}/coupons/count`)
.then((res)=> { 
 console.log(res);
 setCouponsCount(res.data);
}) 
.catch((err) => console.log(err))


  const [company, setCompany] = useState<CompanyModel[]>([]);
  useEffect(() => {
    axios
      .get<CompanyModel[]>(`${urlService.company}/${companyId}`)
      .then((res) => {
        console.log(res.data);
        setCompany([res.data]);
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <div className="content">
      <h1 className="h1">All Companies Coupons</h1>
      <p className="total company-card">Total coupons : {couponsCount}</p>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} />
      ))}
    </div>
  );
}

export default CompanyCoupons;
