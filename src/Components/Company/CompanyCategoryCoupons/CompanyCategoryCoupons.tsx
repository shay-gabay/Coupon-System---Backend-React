import "./CompanyCategoryCoupons.css";
import React, { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import CardB from "../../Shared/Card/CardB";
import { CouponCategory } from "/react/coupon_system_react/src/Models/CouponModel";
import notifyService from "../../../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { gotCompanyCategoryCouponsAction } from "../../../Redux/CouponAppState";
import { useParams } from "react-router-dom";
import store, { RootState } from "../../../Redux/Store";

function CompanyCategoryCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const companyName = useSelector((state:RootState)=>state.userReducer.user.clientName)
  const headers = { 'Authorization': store.getState().userReducer.user.token };
  
  const [selectedCategory, setSelectedCategory] =
    useState<CouponCategory>("FOOD");

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(event.target.value as CouponCategory);
  };

  const fetchCouponsByCategory = () => {
    axios
      .get<CouponModel[]>(`${urlService.company}/${id}/coupons/category`, {
        headers,
          params: { category: selectedCategory, },
        })
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
        dispatch(gotCompanyCategoryCouponsAction(res.data))
      })
      .catch((err) => notifyService.showErrorNotification(err));
  []};

  return (
    <div className="content">
      <h1 className="h1">Company Category Coupons</h1>
      <div className="CustomerCoupons ">
            <p> Company Name: {companyName} </p>
          </div>
          <div className="company-card input">
        <h2>Please select a category</h2>
            <select className="input" id="categoryInput" value={selectedCategory} onChange={handleCategoryChange}>
            {Object.values(CouponCategory).map((category) => (<option key={category} value={category}> {category} </option>))}
            </select>
        <button className="submit" onClick={fetchCouponsByCategory}> Apply</button>
      </div> 
           <div>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      ))}
    </div>
    </div>
  );
}
export default CompanyCategoryCoupons;
