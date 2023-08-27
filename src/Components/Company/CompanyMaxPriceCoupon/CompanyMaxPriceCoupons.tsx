import { useEffect, useState } from "react";
import CardB from "../../Shared/Card/cardB";
import { CouponModel } from "../../../Models/CouponModel";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { CompanyModel } from "../../../Models/CompanyModel";
import notifyService from "../../../Services/NotificationService";

function CompanyMaxPriceCoupons(): JSX.Element {
  const [coupon, setCoupon] = useState<CouponModel[]>([]);
  // const [couponId, setCouponId] = useState<number>();
  const companyId = 2;
  
 useEffect (() => {
    axios
      .get<CouponModel[]>(`${urlService.company}/${companyId}/coupons/maxPrice`)
      .then((res) => {
        console.log(res.data);
        setCoupon(res.data);
      })
      .catch((err) => {
        notifyService.showErrorNotification(err)});
  }, []);

const [selectedMaxPrice, setSelectedMaxPrice] =
    useState<number>();

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMaxPrice(parseInt(event.target.value));
  };

  const fetchCouponsByMaxPrice = () => {
    axios
      .get<CouponModel[]>(
        `${urlService.company}/${companyId}/coupons/maxPrice`,
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

  // const maxPrices = [50, 100, 150, 200]; // Add more values as needed
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
      <h1 className="h1">Company Maximum Price Coupons</h1>
      <div className="CustomerCoupons">
        {company.map((company, idx) => (
          <div key={company.id + " " + idx.toString()}>
            <p>
              Company Name: {company.name}{" "}
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
        <CardB key={coupon.title + " " + idx.toString()} coupon={coupon} />
      ))}
    </div>
  );
}

export default CompanyMaxPriceCoupons;
