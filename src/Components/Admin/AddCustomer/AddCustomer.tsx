import { CustomerModel } from "../../../Models/CustomerModel";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios"; 
import { useNavigate } from "react-router-dom"; 
import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";

function AddCustomer(): JSX.Element {
  const navigate = useNavigate();

  const schema = zod.object({
    firstName: zod.string().nonempty("you must enter first name"),
    lastName: zod.string().nonempty("you must enter last name"),
    email: zod.string().nonempty("you must enter email"),
    password: zod.string().nonempty("you must enter password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CustomerModel>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<CustomerModel> = (data: CustomerModel) => {
    // console.log(data); 
    axios
      .post<CustomerModel>(`${urlService.admin}/customer`, data) 
      .then(() => {
        notifyService.success(`Customer ${data.firstName} ${data.lastName} Added Successfully`);
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        notifyService.showErrorNotification(err);
      });
  };

  return (
    <div className="AddCompany">
      <h1 className="center">Add Customer</h1>
      <form className="company-card width" onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
			
      {(errors?.firstName) ? <span className="red">{errors.firstName.message}</span> : <label htmlFor="firstName">First Name</label>}
			  <input {...register("firstName")} className="input" name="firstName" type="text" placeholder="First Name..." />
			
              {(errors?.lastName) ? <span className="red">{errors.lastName.message}</span> : <label htmlFor="lastName">Last Name</label>}
			  <input {...register("lastName")} className="input" name="lastName" type="text" placeholder="Last Name..." />

			  {(errors?.email) ? <span className="red">{errors.email.message}</span> : <label htmlFor="email">Email</label>}
              <input  {...register("email")} className="input" name="email" type="email" placeholder="Email..." />

        {(errors?.password) ? <span className="red">{errors.password.message}</span> : <label htmlFor="password">Password</label>}
        <input  {...register("password")}  className="input" name="password" type="password" placeholder="Password..."  />

    		<button  className="animated-button button" disabled={!isValid || isSubmitting}>ADD</button>
      </form>
    </div>
  );
}

export default AddCustomer;

