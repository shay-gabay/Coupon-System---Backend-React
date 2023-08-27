import { useEffect, useState } from "react";
import "./CustomerList.css";
import axios from "axios";
import { CustomerModel } from "../../../Models/CustomerModel";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import urlService from "../../../Services/UrlService";
import { useSelector } from "react-redux";

function CustomerList(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel[]>([]);
  const [customerCount,setCustomerCount] = useState<numner>();  useEffect(() => {
  // const total = useSelector((state: RootState) => state.adminReducer.customers.length)
    axios
      .get<CustomerModel[]>(urlService.admin + "/customer")
      .then((res) => {
        console.log(res.data);
        setCustomer(res.data);
      })
      .catch((err) => console.log(err.data));
    }, []);

    axios.get<number>(`${urlService.admin}/customers/count`)
    .then((res)=> { 
     console.log(res);
     setCustomerCount(res.data);
    }) 
    .catch((err) => console.log(err))
  
  return (
    <div className="Table">
      <h1>Customers List</h1>
      <p className="total company-card">Total customers : {customerCount}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {customer.map((customer, idx) => (
            <tr key={`customer ${idx}`}>
              <td>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
              <td>
                <button className="update">
                  <RxUpdate />
                </button>
              </td>
              <td>
                <button className="delete">
                  <RiDeleteBin5Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
