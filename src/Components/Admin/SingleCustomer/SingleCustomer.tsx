import "./SingleCustomer.css";
import React, { useState } from "react";
import axios from "axios";
import { CustomerModel } from "../../../Models/CustomerModel";
import CustomerCard from "../../Shared/Card/CustomerCard";
import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { gotSingleCustomerAction } from "../../../Redux/CustomerAppState";

function SingleCustomer(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel>();
  const [customerId, setCustomerId] = useState<number>(0);
  const [isValidInput, setIsValidInput] = useState(true);
  const dispatch = useDispatch();
  const n = useSelector((state: RootState) => state.customerReducer.customers.length)

  const handleSubmit = () => {
    if (customerId <= n && customerId >= 1) {
      axios
        .get<CustomerModel>(`${urlService.admin}/customer/${customerId}`)
        .then((res) => {
          console.log(res.data);
          dispatch(gotSingleCustomerAction(res.data))
          setCustomer(res.data);
          setIsValidInput(true);
        })
        .catch((err) => {
          notifyService.showErrorNotification(err)
        });
    } else {
      setIsValidInput(false);
    }
  };

  return (
    <div className="SingleCustomer">
      <h1 className="h1">Single Customer</h1>
      <div className="input company-card">
        <h2>Please insert the ID of the customer you want</h2>
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
      <div className="company-info">
         { customer && <CustomerCard customer={customer} /> }
      </div>
   </div>
  );
}

export default SingleCustomer;
