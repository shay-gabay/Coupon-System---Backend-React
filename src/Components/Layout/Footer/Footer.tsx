import CopyRights from "../../Shared/CopyRights/CopyRights";
import { Link } from "react-router-dom";
import "./Footer.css";
import { FcAbout } from "react-icons/fc";

function Footer(): JSX.Element { 
    return (
        <div className="Footer">
        <Link className="abt" to="/about"><FcAbout className="abt" style={{ marginRight: "5px" }} /><b className="a">About Us</b></Link>
            <CopyRights/>
        </div>
    );
}

export default Footer;
