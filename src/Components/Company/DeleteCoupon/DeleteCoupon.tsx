import { useState } from "react";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { CouponModel } from "../../../Models/CouponModel";
import CardB from "../../Shared/Card/CardB";
import notifyService from "../../../Services/NotificationService";

function DeleteCoupon(): JSX.Element {
  const [coupon,setCoupon] = useState<CouponModel | undefined>();
  const [couponId, setCouponId] = useState<number>(0);
  const [isValidInput, setIsValidInput] = useState(true);
  const companyId = 4;

  const handleSubmit = () => {
    axios
      .get<CouponModel>(`${urlService.company}/${companyId}/coupons/${couponId}`)
      .then((res) => {
        setCoupon(res.data);
        setIsValidInput(true);
      })
      .catch((err) => {
        notifyService.showErrorNotification(err);
        setIsValidInput(false);
      });
  };


  const DeleteSubmit = () => {
    axios
      .delete<CouponModel>(`${urlService.company}/${companyId}/coupons/${couponId}`)
      .then((res) => {
        setCoupon(res.data);
        notifyService.success(`Coupon #${coupon?.id} Deleted Successfully`)
      })
      .catch((err) => 
      notifyService.showErrorNotification(err));
  };

  const handleNoButtonClick = () => {
    setCoupon(undefined);
    setCouponId(1);
    setIsValidInput(true);
  };

  return (
    <div>
      <h1 className="h1">Delete Coupon</h1>
      <div className="input company-card">
        <h2>Please insert the ID of the coupon you want to Delete</h2>
        <input
          className={`input-window ${!isValidInput ? "input-error" : ""}`}
          type="number"
          min="1"
          placeholder="ID..."
          value={couponId}
          onChange={(e) => {
            setCouponId(Number(e.target.value));
            setIsValidInput(true);
          }}
        />
        <button className="submit" onClick={handleSubmit}>
          Apply
        </button>
      </div>
      {coupon && <CardB coupon={coupon}/>}
      {coupon && (
        <p className="spc company-card">
          <b> Are you sure you want to delete this coupon ? </b>
          <button className="yes-button" onClick={DeleteSubmit}>Yes</button>
          <button className="no-button" onClick={handleNoButtonClick} >No</button>
        </p>
      )}
    </div>
  );
}

export default DeleteCoupon;
