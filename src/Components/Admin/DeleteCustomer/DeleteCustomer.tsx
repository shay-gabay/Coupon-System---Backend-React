import "./DeleteCustomer.css";
import { useState } from "react";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import { CustomerModel } from "../../../Models/CustomerModel";
import CustomerCard from "../../Shared/Card/CustomerCard";
import notifyService from "../../../Services/NotificationService";
import store from "../../../Redux/Store";

function DeleteCustomer(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel | undefined>();
  const [customerId, setCustomerId] = useState<number>(1);
  const [isValidInput, setIsValidInput] = useState(true);
  const n = 10;

  const handleSubmit = () => {
    if (customerId <= n && customerId >= 1) {
      axios
        .get<CustomerModel>(`${urlService.admin}/customer/${customerId}`)
        .then((res) => {
          setCustomer(res.data);
          setIsValidInput(true);
        })
        .catch((err) => {
          notifyService.showErrorNotification(err);
        });
      } else {
      setIsValidInput(false);
    }
  };

  const DeleteSubmit = () => {
    axios
      .delete<CustomerModel>(`${urlService.admin}/customer/${customerId}`)
      .then((res) => {
        setCustomer(res.data);
       store.dispatch(deletedCustomerAction(customerId))
        notifyService.success(`Customer ${customer?.firstName} ${customer?.lastName} Deleted Successfully`)
      })
      .catch((err) => {
        console.error(err);
        notifyService.showErrorNotification(err);
      });
    };

  const handleNoButtonClick = () => {
    setCustomer(undefined);
    setCustomerId(0);
    setIsValidInput(true);
  };

  return (
    <div>
      <h1 className="h1">Delete Customer</h1>
      <div className="input company-card">
        <h2>Please insert the ID of the company you want to Delete</h2>
        <input
          className={`input-window ${!isValidInput ? "input-error" : ""}`}
          type="number"
          min="1"
          placeholder="ID..."
          value={customerId}
          onChange={(e) => {
            setCustomerId(Number(e.target.value));
            setIsValidInput(true);
          }}
        />
        <button className="submit" onClick={handleSubmit}>
          Apply
        </button>
      </div>
     <p className="company-info"> {customer && <CustomerCard customer={customer} />}</p>
      {customer && (
        <p className="spc company-card">
          <b> Are you sure you want to delete this customer ? </b>
          <button className="yes-button" onClick={DeleteSubmit}>Yes</button>
          <button className="no-button" onClick={handleNoButtonClick}>No</button>
        </p>
      )}
    </div>
  );
}

export default DeleteCustomer;
