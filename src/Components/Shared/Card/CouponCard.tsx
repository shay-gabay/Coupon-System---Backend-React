import moment from "moment";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";
import { useState, useEffect } from 'react';
import urlService from "../../../Services/UrlService";
import axios from "axios";
import notifyService from "../../../Services/NotificationService";
import { useNavigate, useParams } from "react-router-dom";
import store from "../../../Redux/Store";
import { useDispatch } from "react-redux";

interface CouponCardProps {
  coupon: CouponModel;
}
interface ILTimeProps{
  date:Date;
}

function CouponCard(props: CouponCardProps & ILTimeProps): JSX.Element {
  const companyImage = props.coupon.company.image;
  const [isImageValid, setIsImageValid] = useState(true);
 const navigate = useNavigate();
  const Params = useParams();
  const id = +(Params.id || 0);
  const headers = { 'Authorization': store.getState().userReducer.user.token };

  useEffect(() => {
    const img = new Image();

    img.onload = () => {
      setIsImageValid(true);
    };
    img.onerror = () => {
      setIsImageValid(false);
    };

    img.src = props.coupon.image;
  }, [props.coupon.image]);

  const couponId = props.coupon.id;
 
  const handleSubmit = () => {
    axios.post<any>(`${urlService.customer}/${id}/coupons/${couponId}`, null, { headers })
    .then((any) => {
         console.log(any)
          notifyService.success(`Purchase Coupon #${couponId} Successfully`);
          navigate(-1);
        })
        .catch((err) => notifyService.showErrorNotification(err));
   []}
   
    if (!props.coupon) {
      return <h1>No coupons</h1>;
   
    }
    

  return (
    <div className="CouponList">
      <div className="content">
      {isImageValid ? ( <img src={props.coupon.image} alt="Coupon image" height={200} width={200} />      ) : (
        <img src="/src/assets/Images/CsLogo.png" height={200} width={200} />
      )}
        <p className="CouponCard"><a className="color">Coupon </a>#{props.coupon.id}</p>
        <p className="center"><a className="color">Company</a></p>
        <p className="center"><a className="color"></a><img className="no-hover" width={60} height={60} src={companyImage}/></p>
        <p>{props.coupon.title}</p>
        <p>{props.coupon.description}</p>
        <p><a className="color">Price:</a> {props.coupon.price}₪</p>
        <p>
          <a className="color">Amount:</a> {props.coupon.amount}
        </p>
        <p>
        <a className="color">Start Date:</a> {moment(props.coupon.startDate).format("DD.MM.YYYY")}
        </p>
        <p>
          <a className="color">End Date:</a> {moment(props.coupon.endDate).format("DD.MM.YYYY")}
        </p>
        <p>
          <a className="color">Amount:</a> {props.coupon.amount}
        </p>
        <p>
          <a className="color">Category:</a> {props.coupon.category}
        </p>
        <button onClick={handleSubmit} className="animated-button">Purchase Now !</button>
      </div>
    </div>
  );
}

export default CouponCard;