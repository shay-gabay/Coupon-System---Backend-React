import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { gotCompanyMaxPriceCouponsAction } from "../../../Redux/CouponAppState";
import store, { RootState } from "../../../Redux/Store";
import notifyService from "../../../Services/NotificationService";

function CompanyMaxPriceCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const companyName = useSelector((state:RootState)=>state.userReducer.user.clientName);
  const headers = { 'Authorization': store.getState().userReducer.user.token };
 
  useEffect (() => {
    axios.get<CouponModel[]>(`${urlService.company}/${id}/coupons/maxPrice`, { headers})
      .then((res) => {
        setCoupon(res.data);
       dispatch(gotCompanyMaxPriceCouponsAction(res.data))
      })
      .catch((err) =>
      console.log(err)
), 
  []});
    
const [selectedMaxPrice, setSelectedMaxPrice] =
    useState<number>();

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaxPrice(parseInt(event.target.value));
  };

  const fetchCouponsByMaxPrice = () => {
    axios.get<CouponModel[]>(`${urlService.company}/${id}/coupons/maxPrice`, {
    headers,
     params: { maxPrice: selectedMaxPrice, 
    },
    })
      .then((res) => {
        setCoupon(res.data);
      })
      .catch((err) => {
      notifyService.showErrorNotification(err);
  });
  }
  return (
    <div className="content">
      <h1 className="h1">Company Maximum Price Coupons</h1>
      <p className="CustomerCoupons input"> Company Name: {companyName}</p>
      <div className="input company-card">
      <h2>Please insert the maximum price of coupon ₪</h2>
      <input className="input-window" type="number" min="0" step="50" placeholder="Price..." value={selectedMaxPrice}
      onChange={handleMaxPriceChange} />
      <button className="submit" onClick={fetchCouponsByMaxPrice}> Apply </button>
      </div>
      {coupon.map((coupon, idx) => (
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} date={undefined} />
      ))}
    </div>
  );
}

export default CompanyMaxPriceCoupons;
