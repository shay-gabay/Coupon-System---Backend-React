import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminMenu.css";
import { RiAddBoxLine, RiHome2Line } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiFileListLine } from "react-icons/ri";
import { RiUserAddLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { RiCoupon4Fill } from "react-icons/ri";
import { FaPage4 } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
import { PiNumberSquareOneDuotone } from "react-icons/pi";
import { PiUserList } from "react-icons/pi";
import { VscGithubAction } from "react-icons/vsc";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { BsPerson } from "react-icons/bs";

function AdminMenu(): JSX.Element {
  const [fadeIn, setFadeIn] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  useEffect(() => {
    setFadeIn(true); 
  }, []);
  
  const toggleMoreActions = () => {
    setShowMoreActions(!showMoreActions);
  };


  return (
    <div className={`fade ${fadeIn ? "fade-in" : "fade-out"}`}>
      <div className="AdminMenu">
        <h1 className="h1">Admin Menu</h1>
        <Link to={"/AddCompany"} className="link">
          <RiAddBoxLine /> Add Company
        </Link>
        <Link to={"/UpdateCompany"} className="link">
          <RxUpdate /> Update Company
        </Link>
        <Link to={"/DeleteCompany"} className="link">
          <RiDeleteBin5Fill /> Delete Company
        </Link>
        <Link to={"CompanyList"} className="link">
          <RiFileListLine /> Company List
        </Link>
        <Link to={"/SingleCompany"} className="link">
          <PiNumberSquareOneDuotone /> Single Company
        </Link>
        <Link to={"/AddCustomer"} className="link">
          <RiUserAddLine /> Add Customer
        </Link>
        <Link to={"/UpdateCustomer"} className="link">
          <RxUpdate /> Update Customer
        </Link>
        <Link to={"/DeleteCustomer"} className="link">
          <RiDeleteBin5Fill /> Delete Customer
        </Link>
        <Link to={"CustomerList"} className="link">
          <PiUserList /> Customers List
        </Link>
        <Link to={"/SingleCustomer"} className="link">
          <RiUserLine /> Single Customer
        </Link>
        {/* <a className="a">_______________________</a> */}
        <p onClick={toggleMoreActions} className="more-actions link"><VscGithubAction/>More Actions</p>
        {showMoreActions && (
          <div className="more-actions-menu">
            <Link to={"/home"}className="link"><RiHome2Line/>Home</Link>
            <Link to={"/company"} className="link"><MdOutlineMapsHomeWork /> Company Menu</Link>
            <Link to={"/customer"} className="link"><BsPerson /> Customer Menu</Link>
            <Link to={"/AllCoupons"} className="link"><RiCoupon4Fill /> All Coupons</Link>
            <Link to={"/Page404"} className="link"><FaPage4 /> ( Page404 )</Link>
          </div>
        )}
        <img className="imgB" src="/src/assets/Images/Admin2.jpg" />
      </div>
    </div>
  );
}

export default AdminMenu;
