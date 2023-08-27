import { Link } from "react-router-dom";
import "./Page404.css";

function Page404(): JSX.Element {
  return (
    <div className="Page404 button-container">
       <Link to={"/home"}><button className="animated-buttonB overlay-button">
        Go To Home Page
      </button></Link>
      <img
        src="/src/assets/Images/page-404.jpg"
        width={1310}
        height={510}
        className="image"
      />
    </div>
  );
}

export default Page404;
