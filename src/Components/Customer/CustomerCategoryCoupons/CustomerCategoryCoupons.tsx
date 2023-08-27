import React, { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { CustomerModel } from "../../../Models/CustomerModel";
import CardB from "../../Shared/Card/CardB";
import { CouponCategory } from "/react/coupon_system_react/src/Models/CouponModel";
import notifyService from "../../../Services/NotificationService";

function CustomerCategoryCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const [customer, setCustomer] = useState<CustomerModel[]>([]);
  const customerId = 1;

  useEffect(() => {
    axios
      .get<CustomerModel[]>(`${urlService.customer}/${customerId}`)
      .then((res) => {
        console.log(res.data);
        setCustomer([res.data]);
      })
      .catch((err) => notifyService.showErrorNotification(err));
  }, []);

  const [selectedCategory, setSelectedCategory] =
    useState<CouponCategory>("FOOD");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value as CouponCategory);
  };

  const fetchCouponsByCategory = () => {
    axios
      .get<CouponModel[]>(
        `${urlService.customer}/${customerId}/coupons/category`,
        {
          params: {
            category: selectedCategory,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => notifyService.showErrorNotification(err));
  };

  return (
    <div className="content">
      <h1 className="h1">Customer Category Coupons</h1>
      <div className="CustomerCoupons">
        {customer.map((customer, idx) => (
          <div key={customer.id + " " + idx.toString()}>
            <p>
              Customer Name: {customer.firstName} {customer.lastName}{" "}
            </p>
          </div>
        ))}
      </div>

      <div className="company-card input">
        <h2>Please select a category</h2>
            <select
                className="input"
                id="categoryInput"
                value={selectedCategory}
                onChange={handleCategoryChange}
            >
                {Object.values(CouponCategory).map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>
        <button className="submit" onClick={fetchCouponsByCategory}> Apply</button>
      </div>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} />
      ))}
    </div>
    
  );
}
export default CustomerCategoryCoupons;
