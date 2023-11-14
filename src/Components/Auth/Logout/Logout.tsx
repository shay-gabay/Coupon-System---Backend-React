import { useEffect } from "react";
import "./Logout.css";
import { useDispatch, useSelector } from "react-redux";
import { userLoggedOut } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { removeAdminAccess, removeCompanyAccess, removeCustomerAccess } from "../../../Redux/GuardAppState";
import { clearAllCouponsAction } from "../../../Redux/CouponAppState";
import { clearAllCustomerAction } from "../../../Redux/CustomerAppState";
import { clearAllCompanyAction } from "../../../Redux/CompanyAppState";
import { RootState } from "../../../Redux/Store";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";

function Logout(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector ((state:RootState)=>state.userReducer.user)

    useEffect(() => {
        axios.delete<any>(`${urlService.auth}/logout/${user.id}`)
        .then(()=> notifyService.success("Tank you & goodby :)"))
        .catch((err)=> notifyService.showErrorNotification(err))
        
        dispatch(userLoggedOut());
        { user.clientType === 'ADMINISTRATOR' ? dispatch(removeAdminAccess()) : 
          user.clientType === 'COMPANY' ? dispatch(removeCompanyAccess()) :
          user.clientType === 'CUSTOMER' ? dispatch(removeCustomerAccess()) : null }
        dispatch(clearAllCouponsAction())
        dispatch(clearAllCustomerAction())
        dispatch(clearAllCompanyAction())
        navigate("/home");
    }, []);
    return (
        <></>
    );
}

export default Logout;
