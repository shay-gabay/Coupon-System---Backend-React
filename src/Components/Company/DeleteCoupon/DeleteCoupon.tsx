import "./DeleteCoupon.css"
import { useState } from "react";
import { CouponModel } from "../../../Models/CouponModel";
import CardB from "../../Shared/Card/CardB";
import notifyService from "../../../Services/NotificationService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletedCouponAction, gotSingleCouponAction } from "../../../Redux/CouponAppState";
import webApiService from "../../../Services/WebApiService";

function DeleteCoupon(): JSX.Element {
  const [coupon,setCoupon] = useState<CouponModel | undefined>();
  const [couponId, setCouponId] = useState<number>(0);
  const [isValidInput, setIsValidInput] = useState(true);
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);

  const handleSubmit = () => {
    webApiService.getSingleCoupon(id,couponId)
      .then((res) => {
        setCoupon(res.data);
        setIsValidInput(true);
        dispatch(gotSingleCouponAction(res.data))
      })
      .catch((err) => {
        notifyService.showErrorNotification(err);
        setIsValidInput(false);
      });
  };


  const DeleteSubmit = () => {
    webApiService.deleteCoupon(id,couponId)
      .then((res) => {
        setCoupon(res.data);
        dispatch(deletedCouponAction(res.data))
        notifyService.success(`Coupon #${coupon?.id} Deleted Successfully`)
      })
      .catch((err) => 
      notifyService.showErrorNotification(err));
  };

  const handleNoButtonClick = () => {
    setCoupon(undefined);
    setCouponId(1);
    setIsValidInput(true);
    notifyService.error("Coupon not deleted")
  };

  return (
    <div>
      <h1 className="h1">Delete Coupon</h1>
      {(!coupon) ? <div className="input company-card">
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
      </div> : <p></p> }
      {coupon && (
        <p className="mrg spc company-card">
          <b> Are you sure you want to delete this coupon ? </b>
          <button className="yes-button" onClick={DeleteSubmit}>Yes</button>
          <button className="no-button" onClick={handleNoButtonClick} >No</button>
        </p> 
)}
      {coupon && <CardB coupon={coupon}/>}
    </div>
  );
}

export default DeleteCoupon;
