import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import CustomerCard from "../../Shared/Card/CustomerCard";
import { CustomerModel } from "../../../Models/CustomerModel";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { gotSingleCustomerAction } from "../../../Redux/CustomerAppState";
import store from "../../../Redux/Store";

function CustomerDetails(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel>();
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  useEffect(() => {
    const headers = { 'Authorization': store.getState().userReducer.user.token };
    axios
      .get<CustomerModel>(`${urlService.customer}/${id}`,{headers})
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
        dispatch(gotSingleCustomerAction(res.data))
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <div>
      <h1 className="h1">Customer Details</h1>
      <div  className="company-info">
        {customer && <CustomerCard  customer={customer} />}
    </div>
    </div>
  );
}

export default CustomerDetails;
