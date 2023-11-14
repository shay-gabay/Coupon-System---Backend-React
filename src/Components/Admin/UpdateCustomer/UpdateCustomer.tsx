import "./UpdateCustomer.css";
import { useEffect, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { CustomerModel } from "../../../Models/CustomerModel";
import { gotSingleCustomerAction, updatedCustomerACtion } from "../../../Redux/CustomerAppState";
import webApiService from "../../../Services/WebApiService";

function UpdateCustomer(): JSX.Element {

  const [isValidInput, setIsValidInput] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const [customerId, setCustomerId] = useState<number>(id);
 
  const schema = zod.object({
    id: zod.number(),
    firstName: zod.string().nonempty("you must enter first name"),
    lastName: zod.string().nonempty("you must enter last name"),
    email: zod.string().nonempty("you must enter email"),
    password: zod.string().min(4,"minimum 4 characters").nonempty("you must enter password"),
  });

  const { register, handleSubmit, setValue, formState: { errors, isValid, isSubmitting },} = 
  useForm<CustomerModel>({ mode: "all", resolver: zodResolver(schema) });
  
  
    const handleSubmit2 = () => { 
    webApiService.getSingleCustomer(customerId)
      .then((res) => {
        const customerData = res.data;
        console.log(customerData);
        setValue("id", customerData.id);
        setValue("firstName", customerData.firstName);
        setValue("lastName", customerData.lastName);
        setValue("email", customerData.email);
        setValue("password", customerData.password);
        dispatch(gotSingleCustomerAction(res.data));
      })
      .catch((err) => {
        notifyService.showErrorNotification(err);
      });
    []};

  const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {
    webApiService.updateCustomer(customerId,data)
      .then((res) => {
        notifyService.success(`Customer ${data.firstName," ",data.lastName} Updated Successfully`);
        dispatch(updatedCustomerACtion(res.data));
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        notifyService.showErrorNotification(err);
      });
  };

  useEffect(() => {
    if (id > 0) {
      handleSubmit2();
    }
  }, [id]);

  return (
    <div>
      <h1 className="center">Update Customer</h1>
     {id === 0 ? (
     <div  className="input company-card">
            <h2>Please insert the ID of the customer you want to update</h2>
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
        <button className="submit" onClick={handleSubmit2}>
          Apply
        </button>
      </div>  ) : null} 
      <form className="company-card width"  onSubmit={handleSubmit(onSubmit)}>
              
              <label htmlFor="id">Customer Id</label>
              <input {...register("id")} className="circle" name="id" type="text" value={customerId}  disabled={true} />

              {(errors?.firstName) ? <span className="red">{errors.firstName.message}</span> : <label htmlFor="firstName">First Name</label>}
		      	  <input {...register("firstName")} className="input marg" name="firstName" type="text" placeholder="First Name..." />
			
              {(errors?.lastName) ? <span className="red">{errors.lastName.message}</span> : <label htmlFor="lastName">Last Name</label>}
        		  <input {...register("lastName")} className="input marg" name="lastName" type="text" placeholder="Last Name..." />
 
      			  {(errors?.email) ? <span className="red">{errors.email.message}</span> : <label htmlFor="email">Email</label>}
              <input  {...register("email")} className="input marg" name="email" type="email" placeholder="Email..." />

              {(errors?.password) ? <span className="red">{errors.password.message}</span> : <label htmlFor="password">Password</label>}
              <input  {...register("password")}  className="input marg" name="password" type="password" placeholder="Password..."  />

              <button className="animated-button button" disabled={!isValid || isSubmitting}>Update</button>
      </form>
    </div>
  );
}

export default UpdateCustomer;
