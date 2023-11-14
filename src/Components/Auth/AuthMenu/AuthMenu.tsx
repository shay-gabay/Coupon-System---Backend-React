import { Link } from "react-router-dom";
import "./AuthMenu.css";
import { useSelector } from "react-redux";
import { RootState } from "./../../../Redux/Store";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";

function AuthMenu(): JSX.Element {
    const user =useSelector((state:RootState)=>state.userReducer.user)
    return (
        <div className="AuthMenu">
            {
                (user.token)
                    ?
                    <>
                        <p className="center">connected as &nbsp;<h2 className="white">{user.clientName}</h2>&nbsp;&nbsp;&nbsp; 
                        <Link className="link" to="/logout"> <button className="button"><AiOutlineLogout style={{ marginRight: "5px" }} /><b>LogOut</b></button></Link>
                         </p> 
                    </>
                    :
                    <>
                        <p className="center">hello guest&nbsp;&nbsp;&nbsp; 
                         <div className="buttons"> 
                         <Link className="link" to="/Login"> <button className="button"><AiOutlineLogin style={{ marginRight: "5px" }} /><b>LogIn</b></button></Link>
                         </div> 
                         </p>
                       
                       
                    </>
            }
        </div>
    );
}

export default AuthMenu;
