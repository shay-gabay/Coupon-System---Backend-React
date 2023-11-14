import moment from "moment";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";
import { useState, useEffect } from 'react';

interface CouponCardProps {
  coupon: CouponModel;
}
interface ILTimeProps{
  date:Date;
}


function CouponCard(props: CouponCardProps & ILTimeProps): JSX.Element {
  const companyImage = props.coupon.company.image;

  const [isImageValid, setIsImageValid] = useState(true);

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
      </div>
    </div>
  );
}

export default CouponCard;