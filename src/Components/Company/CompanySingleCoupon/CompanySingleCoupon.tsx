import "./CompanySingleCoupon.css";
import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
// import CustomerCard from "../../Shared/Card/CustomerCard";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
// import { CustomerModel } from "../../../Models/CustomerModel";
import { CompanyModel } from "../../../Models/CompanyModel";
import notifyService from "../../../Services/NotificationService";

function CompanySingleCoupon(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel>();
  const [couponId, setCouponId] = useState<number>();
  const companyId = 1;
  const handleSubmit = () => {
    axios
      .get<CouponModel>(`${urlService.company}/${companyId}/coupons/${couponId}`)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => notifyService.showErrorNotification(err));
  };

  const [company, setCompany] = useState<CompanyModel>();
  useEffect(() => {
    axios
      .get<CompanyModel>(`${urlService.company}/${companyId}`)
      .then((res) => {
        console.log(res.data);
        setCompany(res.data);
      })
      .catch((err) => notifyService.showErrorNotification(err.data));
  }, []);

  return (
    <div className="content">
      <h1 className="h1">Company's Single Coupon</h1>
      <div className="CustomerCoupons">
          <div>
            <p>
              Company Name: {company?.name}
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
        {coupon && <CardB coupon={coupon} />}
    </div>
  );
}

export default CompanySingleCoupon;
