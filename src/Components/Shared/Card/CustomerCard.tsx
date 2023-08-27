import { CustomerModel } from "../../../Models/CustomerModel";

interface CustomerCardProps {
  customer: CustomerModel;
}

function CustomerCard(props: CustomerCardProps): JSX.Element {
  return (
    <div className="Card customer-card">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {/* <img src={"/src/assets/Images/customer photo.png"} alt="Customer" height={50} width={50}/> */}
            <td>{props.customer.id}</td>
            <td>{props.customer.firstName}</td>
            <td>{props.customer.lastName}</td>
            <td>{props.customer.email}</td>
            <td>{props.customer.password}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CustomerCard;
