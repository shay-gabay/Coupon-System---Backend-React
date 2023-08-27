import "./Header.css";
import logoCs from "../../../assets/Images/LogoCs.jpg";
import { AiOutlineLogout } from "react-icons/ai";
import { AiOutlineLogin } from "react-icons/ai";
import { BiRegistered } from "react-icons/bi";

function Header(): JSX.Element {
  return (
    <div className="Header">
      <div className="header-content">
        <div className="logo-container">
          <img src={logoCs} alt="Coupon System Logo" width={100} height={80} />
        </div>
        <div className="title-container">
          <h1 className="coupon-title">Coupon</h1>
          <h1 className="system-title">System</h1>
        </div>
      </div>
     <div className="buttons">
     <button className="button"><BiRegistered style={{ marginRight: "5px" }} /><b>Register</b></button>
     <button className="button"><AiOutlineLogin style={{ marginRight: "5px" }} /><b>LogIn</b></button>
      <button className="button"><AiOutlineLogout style={{ marginRight: "5px" }} /><b>LogOut</b></button>
      </div>
    </div>
  );
}

export default Header;
