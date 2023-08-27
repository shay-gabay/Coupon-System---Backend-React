import { Link } from "react-router-dom";
import "./AuthMenu.css";
import { useSelector } from "react-redux";
import { RootState } from "./../../../Redux/Store";

function AuthMenu(): JSX.Element {
    const user =useSelector((state:RootState)=>state.userReducer.user)
    return (
        <div className="AuthMenu">
            {
                (user.token)
                    ?
                    <>
                        <p>connected as {user.email} <Link to="logout">Logout</Link></p>
                    </>
                    :
                    <>
                        <p>hello guest&nbsp;&nbsp;&nbsp;
                            <Link to="register">Register</Link>
                            &nbsp;&nbsp;&nbsp;
                            <Link to="login">Login</Link>
                        </p>
                    </>
            }
        </div>
    );
}

export default AuthMenu;
