import "./CustomerMaxPriceCoupons.css";
import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { CustomerModel } from "../../../Models/CustomerModel";
import notifyService from "../../../Services/NotificationService";

function CustomerMaxPriceCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  // const [couponId, setCouponId] = useState<number>();
  const customerId = 1;
  
 useEffect (() => {
    axios
      .get<CouponModel[]>(`${urlService.customer}/${customerId}/coupons/maxPrice`)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => console.log(err.data));
  }, []);

const [selectedMaxPrice, setSelectedMaxPrice] =
    useState<number>();

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaxPrice(parseInt(event.target.value));
  };

  const fetchCouponsByMaxPrice = () => {
    axios
      .get<CouponModel[]>(
        `${urlService.customer}/${customerId}/coupons/maxPrice`,
        {
          params: {
            maxPrice: selectedMaxPrice,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => notifyService.showErrorNotification(err));
  }; 

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
      <h1 className="h1">Customer Maximum Price Coupons</h1>
      <div className="CustomerCoupons">
        {customer.map((customer, idx) => (
          <div key={customer.id + " " + idx.toString()}>
            <p>
              Customer Name: {customer.firstName} {customer.lastName} {" "}
            </p>
          </div>
        ))}
      </div>

      <div className="input company-card">
  <h2>Please insert the maximum price of coupon ₪</h2>
  <input className="input-window"
    type="number"
    min="0"
    step="50"
    placeholder="Price..."
    value={selectedMaxPrice}
    onChange={handleMaxPriceChange}
  />
  <button className="submit" onClick={fetchCouponsByMaxPrice}> Apply </button>
</div>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      ))}
    </div>
  );
}

export default CustomerMaxPriceCoupons;
