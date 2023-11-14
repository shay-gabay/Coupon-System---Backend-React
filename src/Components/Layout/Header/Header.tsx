import "./Header.css";
import logoCs from "../../../assets/Images/LogoCs.jpg";
import AuthMenu from "../../Auth/AuthMenu/AuthMenu";

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
      <AuthMenu/>
    </div>
  );
}

export default Header;
