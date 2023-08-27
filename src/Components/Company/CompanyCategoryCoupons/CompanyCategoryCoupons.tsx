import "./CompanyCategoryCoupons.css";
import React, { useEffect, useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import CardB from "../../Shared/Card/CardB";
import { CouponCategory } from "/react/coupon_system_react/src/Models/CouponModel";
import { CompanyModel } from "../../../Models/CompanyModel";
import notifyService from "../../../Services/NotificationService";

function CompanyCategoryCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const [company, setCompany] = useState<CompanyModel[]>([]);
  const companyId = 1;

  useEffect(() => {
    axios
      .get<CompanyModel[]>(`${urlService.company}/${companyId}`)
      .then((res) => {
        console.log(res.data);
        setCompany([res.data]);
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
        `${urlService.company}/${companyId}/coupons/category`,
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
      <h1 className="h1">Company Category Coupons</h1>
      <div className="CustomerCoupons">
        {company.map((company, idx) => (
          <div key={company.id + " " + idx.toString()}>
            <p>
              Company Name: {company.name}{" "}
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
export default CompanyCategoryCoupons;
