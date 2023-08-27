import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
// import CustomerCard from "../../Shared/Card/CustomerCard";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { CustomerModel } from "../../../Models/CustomerModel";
import notifyService from "../../../Services/NotificationService";

function CustomerSingleCoupon(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel>();
  const [couponId, setCouponId] = useState<number>(0);
  const customerId = 1;
  const handleSubmit = () => {
    axios
      .get<CouponModel>(
        `${urlService.customer}/${customerId}/coupons/${couponId}`
      )
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => notifyService.showErrorNotification(err));
  };

  const [customer, setCustomer] = useState<CustomerModel>();
  useEffect(() => {
    axios
      .get<CustomerModel>(`${urlService.customer}/${customerId}`)
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => notifyService.showErrorNotification(err));
  }, []);

  return (
    <div className="content">
      <h1 className="h1">Customer Single Coupon</h1>
      <div className="CustomerCoupons">
          <div>
            <p>
              Name: {customer?.firstName} {customer?.lastName }{" "}
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
       {coupon && <CardB coupon={coupon} /> }
    </div>
  );
}

export default CustomerSingleCoupon;
