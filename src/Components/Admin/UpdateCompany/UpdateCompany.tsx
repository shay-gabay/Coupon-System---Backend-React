import "./UpdateCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import {  useState } from "react";
import store from "./../../../Redux/Store";
import { CompanyModel } from "../../../Models/CompanyModel";
import webApiService from "../../../Services/WebApiService";
function UpdateCompany(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const id = +(params.id || 0);
    const [obj] = useState<CompanyModel>(store.getState().tasksReducer.tasks.filter(t => t.id === id)[0])
    console.log(obj);
    //todo - from some reason i cannot present the when value!

  //  const defaultValuesObj = { ...obj, when: moment(obj.when).format("DD/MM/YY hh:mm") }; //Spread Operator
    const defaultValuesObj = { ...obj }; //Spread Operator

    const schema = zod.object({ 
        name: zod.string().nonempty("you must enter name"),
        email: zod.string().nonempty("you must enter email"),
        password: zod.string().nonempty("you must enter password"),
        image: zod.string().nonempty("you must insert company-logo"),
      });


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } } =
        useForm<CompanyModel>({ defaultValues: defaultValuesObj, mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {

        return webApiService.updateTaskAuth(id, data)
            .then(res => {
                notifyService.success("Danny is 100% Fullstack!!!")
                dispatch(updatedTaskAction(res.data));
                navigate("/adminMenu");
            })
            .catch(err => notifyService.error(err))
    };


    return (
        <div className="UpdateCompany">
            <h1>Update Company</h1>

            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
                {/* <select {...register("color")}> <option>WHITE</option> <option>BALCK</option> </select> */}

              <label htmlFor="id">Id</label>
              <input name="id" type="text" value={obj.id} disabled={true} />

              {(errors?.name) ? <span className="red">{errors.name.message}</span> : <label htmlFor="name">Name</label>}
	     	  <input {...register("name")} className="input" name="name" type="text" placeholder="Name..." />
			
		      {(errors?.email) ? <span className="red">{errors.email.message}</span> : <label htmlFor="email">Email</label>}
              <input  {...register("email")} className="input" name="email" type="email" placeholder="Email..." />

              {(errors?.password) ? <span className="red">{errors.password.message}</span> : <label htmlFor="password">Password</label>}
              <input  {...register("password")}  className="input" name="password" type="password" placeholder="Password..." />

			  {(errors?.image) ? <span className="red">{errors.image.message}</span> : <label htmlFor="image">Company Logo</label>}
			  <input {...register("image")}  className="input" name="image" type="text" placeholder="Company Logo..." />

                <button disabled={!isValid || isSubmitting}>Update</button>
            </form>
        </div>
    );
}

export default UpdateCompany;


