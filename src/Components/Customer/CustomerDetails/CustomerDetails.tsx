import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import axios from "axios";
import urlService from "../../../Services/UrlService";
import CustomerCard from "../../Shared/Card/CustomerCard";
import { CustomerModel } from "../../../Models/CustomerModel";

function CustomerDetails(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel[]>([]);
  useEffect(() => {
    axios
      .get<CustomerModel[]>(urlService.customer + "/1")
      .then((res) => {
        console.log(res.data);
        setCustomer([res.data]);
      })
      .catch((err) => console.log(err.data));
  }, []);

  return (
    <div>
      <h1 className="h1">Customer Details</h1>
      <div  className="company-info">
      {customer.map((customer, idx) => (
        <CustomerCard
          key={customer.id + " " + idx.toString()}
          customer={customer}
        />
      ))}
    </div>
    </div>
  );
}

export default CustomerDetails;
