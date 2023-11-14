import "./CopyRights.css";

function CopyRights(): JSX.Element {
   const year = new Date().getFullYear(); 
    return (
        <div className="CopyRights">
            <p><b className="color b"> Coupon System </b></p>
            <p> All Rights Reserved To Shay Gabay  &copy; {year} </p>
            <p><a> John Bryce Academy</a></p>
            <p><span> Lecturer Kobi Shasha</span></p>
        </div>
    );
}

export default CopyRights;
