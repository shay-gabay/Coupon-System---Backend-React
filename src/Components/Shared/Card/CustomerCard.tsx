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
