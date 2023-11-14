import "./DeleteCustomer.css";
import { useState } from "react";
import { CustomerModel } from "../../../Models/CustomerModel";
import CustomerCard from "../../Shared/Card/CustomerCard";
import notifyService from "../../../Services/NotificationService";
import { deletedCustomerAction, gotSingleCustomerAction } from "../../../Redux/CustomerAppState";
import { useDispatch } from "react-redux";
import webApiService from "../../../Services/WebApiService";

function DeleteCustomer(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel>();
  const [customerId, setCustomerId] = useState<number>(0);
  const [isValidInput, setIsValidInput] = useState(true);
 const dispatch = useDispatch();

  const handleSubmit = () => {
    webApiService.getSingleCustomer(customerId)  
        .then((res) => {
          setCustomer(res.data);
          setIsValidInput(true);
          dispatch(gotSingleCustomerAction(res.data))
        })
        .catch((err) => {
          notifyService.showErrorNotification(err);
          setIsValidInput(false);
        });
  };

  const DeleteSubmit = () => {
    webApiService.deleteCustomer(customerId)
      .then((res) => {
        setCustomer(res.data);
        dispatch(deletedCustomerAction(customerId))
        notifyService.success(`Customer ${customer?.firstName} ${customer?.lastName} Deleted Successfully`)
      })
      .catch((err) => {
        notifyService.showErrorNotification(err);
      });
    };

  const handleNoButtonClick = () => {
    setCustomer(undefined);
    setCustomerId(0);
    setIsValidInput(true);
    notifyService.error("Customer Not Deleted");
  };

  return (
    <div>
      <h1 className="h1">Delete Customer</h1>
      { (!customer) ? <div className="input company-card">
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
      </div> : null } 
      {customer && (
        <p className="spc company-card">
          <b> Are you sure you want to delete this customer ? </b>
          <button className="yes-button" onClick={DeleteSubmit}>Yes</button>
          <button className="no-button" onClick={handleNoButtonClick}>No</button>
        </p>
      )}
     <p className="company-info"> {customer && <CustomerCard customer={customer} />}</p>

    </div>
  );
}

export default DeleteCustomer;
