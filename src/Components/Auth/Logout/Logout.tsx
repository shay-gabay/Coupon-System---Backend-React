import { useEffect } from "react";
import "./Logout.css";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { removeAdminAccess } from "../../../Redux/GuardAppState";

function Logout(): JSX.Element {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(userLoggedOut());
        dispatch(removeAdminAccess())
        navigate("/login");
    }, []);
    return (
        <></>
    );
}

export default Logout;
