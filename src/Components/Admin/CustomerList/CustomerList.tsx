import { useEffect, useState } from "react";
import "./CustomerList.css";
import axios from "axios";
import { CustomerModel } from "../../../Models/CustomerModel";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import urlService from "../../../Services/UrlService";
import { useDispatch, useSelector } from "react-redux";
import store, { RootState } from "../../../Redux/Store";
import { deletedCustomerAction, gotAllCustomersAction } from "../../../Redux/CustomerAppState";
import notifyService from "../../../Services/NotificationService";
import { Link } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";

function CustomerList(): JSX.Element {
  const [customer, setCustomer] = useState<CustomerModel[]>(store.getState().customerReducer.customers);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerModel | null>(null); 
  const total = useSelector((state: RootState) => state.customerReducer.customers.length)
  const dispatch = useDispatch();

  useEffect(() => {
  webApiService.getAllCustomers()
      .then((res) => {
        setCustomer(res.data);
        dispatch(gotAllCustomersAction(res.data))
      })
      .catch((err) => console.log(err.data));
    }, []);

const handleDeleteClick = (customer: CustomerModel) => {
    setSelectedCustomer(customer); 
  };


  const handleDeleteConfirm = () => {
    if (selectedCustomer) {
      const customerId = selectedCustomer.id;

      axios
        .delete<CustomerModel>(`${urlService.admin}/customer/${customerId}`)
        .then(() => {
          const updatedCustomerList = customer.filter((c) => c.id !== customerId);
          setCustomer(updatedCustomerList);
          setSelectedCustomer(null);
          dispatch(deletedCustomerAction(customerId));
          notifyService.success(`Company ${selectedCustomer?.firstName}${selectedCustomer?.lastName} Deleted Successfully`);
        })
        .catch((err) => {
          notifyService.showErrorNotification(err.message || "Error");
        });
    }
  };

 const handleDeleteCancel = () => {
    setSelectedCustomer(null);
  };


  return (
    <div className="Table">
      <h1>Customers List</h1>
      <p className="total company-card">Total Customers : { total ? <span>{total}</span> : <span>No Values</span> }</p>
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
              <td><Link  className="hover-link" to={`/SingleCustomer/${customer.id}`}></Link>{customer.id}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.password}</td>
              <td>
                <Link to={`/UpdateCustomer/${customer.id}`}><button className="update">
                  <RxUpdate />
                </button></Link> 
              </td>
              <td>
                <button className="delete" onClick={() => handleDeleteClick(customer)}>
                  <RiDeleteBin5Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     {selectedCustomer && ( 
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete {selectedCustomer.firstName} {selectedCustomer.lastName} ?</p>
          <button className="yes-button" onClick={handleDeleteConfirm}>Yes</button>
          <button className="no-button" onClick={handleDeleteCancel}>No</button>
        </div>
     )}
    </div>
  );
}

export default CustomerList;
