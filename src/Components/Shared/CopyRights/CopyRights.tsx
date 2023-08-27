import "./CopyRights.css";

function CopyRights(): JSX.Element {
   const year = new Date().getFullYear(); 
    return (
        <div className="CopyRights">
            <p><b className="color b">Coupon System </b> All Rights Reserved To Shay Gabay  &copy; 2023 <a>John Bryce Academy</a><span> Lecturer Kobi Shasha</span></p>
        </div>
    );
}

export default CopyRights;
