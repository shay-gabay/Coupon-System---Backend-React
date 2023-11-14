import React, { useEffect, useState } from "react";
import "./SingleCustomer.css";
import { CustomerModel } from "../../../Models/CustomerModel";
import CustomerCard from "../../Shared/Card/CustomerCard";
import notifyService from "../../../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { gotSingleCustomerAction } from "../../../Redux/CustomerAppState";
import webApiService from "../../../Services/WebApiService";
import { useParams } from "react-router-dom";

function SingleCustomer(): JSX.Element {
  const params = useParams();
  const id = +(params.id || 0);
  const [customer, setCustomer] = useState<CustomerModel>();
  const [customerId, setCustomerId] = useState<number | undefined>(id);
  const [isValidInput, setIsValidInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();
  const customerFromRedux = useSelector((state: RootState) => state.customerReducer.customers.find((c) => c.id === customerId));

  const handleSubmit = () => {
    if (isLoading) return; 
    setIsLoading(true);
    if (customerFromRedux) {
      setIsValidInput(true);
      setIsLoading(false);
      setCustomer(customerFromRedux);
    } else {
      webApiService.getSingleCustomer(customerId)
        .then((res) => {
          dispatch(gotSingleCustomerAction(res.data));
          setIsValidInput(true);
          setCustomer(res.data);
        })
        .catch((err) => {
          notifyService.showErrorNotification(err);
        })
        .finally(() => {
          setIsLoading(false); 
        });
    }
  };

  useEffect(() => {
    if (id > 0) {
      handleSubmit();
    }
  }, [id]);


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
          value={customerId || ""}
          onChange={(e) => {
            const inputCustomerId = Number(e.target.value);
            setCustomerId(isNaN(inputCustomerId) ? undefined : inputCustomerId);
            setIsValidInput(true);
          }}
        />
        <button className="submit" onClick={handleSubmit}>
          Apply
        </button>
      </div>
      <div className="company-info">
        {customer && <CustomerCard customer={customer} />}
      </div>
    </div>
  );
}

export default SingleCustomer;
