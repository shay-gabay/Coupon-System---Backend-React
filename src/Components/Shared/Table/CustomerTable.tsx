import { CustomerModel } from "../../../Models/CustomerModel";

interface CustomerCardProps{
    customer : CustomerModel;
}

function CustomerCard(props:CustomerCardProps): JSX.Element {
    return (
        <div className="Table">
            <img src={"/src/assets/Images/customer photo.png"} alt="Customer" height={200} width={200}/>
            <p># {props.customer.id} {props.customer.firstName} {props.customer.lastName}</p>
            <p>Email : {props.customer.email}</p>
            <p>Password : {props.customer.password}</p>
            {/* <p>Coupons : {props.customer.couponId}</p> */}
        </div>
    );
}

export default CustomerCard;
