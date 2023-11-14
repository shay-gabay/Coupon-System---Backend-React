import moment from "moment";
import { CouponModel } from "../../../Models/CouponModel";
import "./CouponCard.css";
import { useState, useEffect } from 'react';
import notifyService from "../../../Services/NotificationService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { deletedCouponAction } from "../../../Redux/CouponAppState";
import { useDispatch } from "react-redux";
import store from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";

interface CouponCardProps {
  coupon: CouponModel;
}
interface ILTimeProps{
  date:Date;
}

function CouponCardC(props: CouponCardProps & ILTimeProps): JSX.Element {
    
  const [coupon,setCoupon] = useState<CouponModel[]>(store.getState().couponReducer.coupons);
  const [selectedCoupon,setSelectedCoupon] = useState<CouponModel | null>(null);
  const dispatch = useDispatch();
  const companyImage = props.coupon.company.image;
  const [isImageValid, setIsImageValid] = useState(true);
  const navigate = useNavigate();
  const Params = useParams();
  const id = +(Params.id || 0);
  const couponId = +(Params.couponId || 0);

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
   
    if (!props.coupon) {
   console.log('no coupons')
      return <h1>No coupons</h1>;
    }

    const handleDeleteClick = (coupon: CouponModel) => {
        setSelectedCoupon(coupon); 
      };

      const  handleDeleteConfirm  = () => {
       console.log("cpn id:  ",props.coupon.id,"id: ", id)
       webApiService.deleteCoupon(id,props.coupon.id) 
          .then(() => {
            const updatedCouponList = coupon.filter((c) => c.id !== couponId);
                      setCoupon(updatedCouponList);
                      setSelectedCoupon(null);
                      dispatch(deletedCouponAction(couponId));
                      navigate("/company")
                      notifyService.success(`Coupon #${couponId} Deleted Successfully`)
        })
          .catch((err) => 
          notifyService.showErrorNotification(err));
      };

      const handleDeleteCancel = () => {
        setSelectedCoupon(null);
    notifyService.error("Coupon Not Deleted");
      };

  return (
    <div className="psn">
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
        <div>
        <Link to={`/UpdateCoupon/${id}/${props.coupon.id}`}><button className="btn upd"> <RxUpdate /> Update  </button></Link>
          <button className="btn dlt" onClick={() => handleDeleteClick(props.coupon)}> <RiDeleteBin5Fill /> Delete  </button>
        </div>
      </div>
    </div>
    {selectedCoupon && ( 
        <p className="confirmation-dialog">
          <p>Are you sure you want to delete coupon #{selectedCoupon.id} ?</p>
          <button className="yes-button" onClick={handleDeleteConfirm}>Yes</button>
          <button className="no-button" onClick={handleDeleteCancel}>No</button>
        </p>  )}
    </div>
  );
}

export default CouponCardC;