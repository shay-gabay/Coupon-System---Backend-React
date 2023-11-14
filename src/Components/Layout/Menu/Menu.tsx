import "./Menu.css";
import AdminMenu from "../../Admin/AdminMenu/AdminMenu";
import CustomerMenu from "../../Customer/CustomerMenu/CustomerMenu";
import CompanyMenu from "../../Company/CompanyMenu/CompanyMenu";
import Welcome from "../PicShow/Welcome"
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";

function Menu(): JSX.Element {
  const ClientType = useSelector((state: RootState) => state.userReducer.user.clientType) 
  const id = useSelector((state: RootState) => state.userReducer.user.id) 
    return (
        <div className="Menu">
        { ClientType === "ADMINISTRATOR" && id==1 ? <AdminMenu/> : 
          ClientType === "COMPANY"  ?  <CompanyMenu/> : 
          ClientType === "CUSTOMER" ? <CustomerMenu/> : 
         <Welcome/> }   
        </div>
    );
}

export default Menu;
