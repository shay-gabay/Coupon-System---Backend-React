import "./AdminMenu.css";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { RiAddBoxLine, RiHome2Line } from "react-icons/ri";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { RiFileListLine } from "react-icons/ri";
import { RiUserAddLine } from "react-icons/ri";
import { RiUserLine } from "react-icons/ri";
import { RiCoupon4Fill } from "react-icons/ri";
import { FaPage4 } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";
// import { PiNumberSquareOneDuotone } from "react-icons/pi";
import { PiUserList } from "react-icons/pi";
import { VscGithubAction } from "react-icons/vsc";
import { MdOutlineMapsHomeWork } from "react-icons/md";
import { VscOrganization } from "react-icons/vsc";

function AdminMenu(): JSX.Element {

  const [fadeIn, setFadeIn] = useState(false);
  const [showMoreActions, setShowMoreActions] = useState(false);
  const params = useParams();
  const id = +(params.id || 0);

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
        <Link to={`/AddCompany`} className="link"><MdOutlineMapsHomeWork /> Add Company </Link>
        <Link to={`/AddCustomer`} className="link"> <RiUserAddLine /> Add Customer </Link>
        <Link to={`CompanyList`} className="link"> <RiFileListLine /> Company List </Link>
        <Link to={`CustomerList`} className="link"> <PiUserList /> Customers List </Link>
        <p onClick={toggleMoreActions} className="more-actions link"><VscGithubAction/>More Actions</p>
        {showMoreActions && (
          <div className="more-actions-menu">
            <Link to={"/home"}className="link"><RiHome2Line/>Home</Link>
            <Link to={`/UpdateCompany/${id}`} className="link"> <RxUpdate /> Update Company </Link>
            <Link to={`/UpdateCustomer/${id}`} className="link"> <RxUpdate /> Update Customer </Link>
            <Link to={`/DeleteCompany/${id}`} className="link"> <RiDeleteBin5Fill /> Delete Company </Link>
            <Link to={`/DeleteCustomer/${id}`} className="link"> <RiDeleteBin5Fill /> Delete Customer </Link>  
            <Link to={`/SingleCompany/${id}`} className="link"> <VscOrganization/> Single Company </Link>
            <Link to={`/SingleCustomer/${id}`} className="link"> <RiUserLine /> Single Customer </Link>


            <Link to={"/AllCoupons"} className="link"><RiCoupon4Fill /> All Coupons</Link>
            <Link to={"/Page404"} className="link"><FaPage4 /> ( Page404 )</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminMenu;
