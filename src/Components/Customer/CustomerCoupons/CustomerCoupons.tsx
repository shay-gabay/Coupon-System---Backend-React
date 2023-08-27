import { useEffect, useState } from "react";
import "./CustomerCoupons.css";
import CardB from "../../Shared/Card/cardB";
// import CustomerCard from "../../Shared/Card/CustomerCard";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";

function CustomerCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const customerId=1

  useEffect(() => {
    axios
      .get<CouponModel[]>(`${urlService.customer}/${customerId}/coupons`)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => console.log(err.data));
}, []);

  const [customer, setCustomer] = useState<CustomerModel[]>([]);
  useEffect(() => {
    axios
      .get<CustomerModel[]>(`${urlService.customer}/${customerId}`)
      .then((res) => {
        console.log(res.data);
        setCustomer([res.data]);
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <div className="content">
      <h1 className="h1">Customer Coupons</h1>
      <div className="CustomerCoupons">
        {customer.map((customer, idx) => (
         <div key={customer.id + " " + idx.toString()}>
         <p>Name: {customer.firstName} {customer.lastName} </p>
       </div>
     ))}
      </div>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} />
      ))}
    </div>
  );
}

export default CustomerCoupons;
