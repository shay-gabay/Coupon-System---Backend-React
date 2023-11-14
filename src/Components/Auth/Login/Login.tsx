import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginReqModel } from "../../../Models/Login";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loggedInAsAdmin, loggedInAsCompany, loggedInAsCustomer } from "../../../Redux/GuardAppState";
import { ClientType } from "../../../Models/Login";
import { useState } from "react";
import { TfiUnlock } from "react-icons/tfi";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { userLoggedIn } from "../../../Redux/UserAppState";


function Login(): JSX.Element {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedClientType, setSelectedClientType] = useState<ClientType>();
    const handleClientTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedClientType(event.target.value as ClientType);
    };

    const schema = zod.object({
        clientType: zod.string().nonempty("You should provide valid Client Type"),
        email: zod.string().email("You should provide valid email"),
        password: zod.string().min(4, "Minimum 4 characters"),
    });

    const { register, handleSubmit,formState: { errors, isValid, isSubmitting } }
        = useForm<LoginReqModel>({ mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<LoginReqModel> = (data: LoginReqModel) => {
        
        return webApiService.login(data)
        .then((res) => {
            console.log(res.data)  
            if (data.email === 'admin@admin.com' 
                && data.password === 'admin' 
                && data.clientType === 'ADMINISTRATOR') {
                    dispatch(loggedInAsAdmin());
                    dispatch(userLoggedIn(res.data))
                    navigate("/admin");}
                if (data.clientType === 'COMPANY') {
                    dispatch(loggedInAsCompany());
                    dispatch(userLoggedIn(res.data))
                    navigate("/company");}
                if (data.clientType === 'CUSTOMER') {
                    dispatch(loggedInAsCustomer());
                    dispatch(userLoggedIn(res.data))
                    navigate("/customer");}
            })
            .catch(err => notifyService.showErrorNotification(err));
   []};

    return (
       <div>
            <img className="imgD" src="/src/assets/Images/show.jpg"/>

       <div className="login">

            <h1 className="s">Login</h1>
            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
                <div  >

                <div className="circle-b px"><AiOutlineUser /> </div>
                {(errors?.clientType) ? <span className="red">{errors.clientType.message}</span> : <label htmlFor="ClientType"> Client Type</label>}
			    <select {...register("clientType")} className="input cx" id="clientTypeInput" value={selectedClientType} onChange={handleClientTypeChange}>
                {Object.values(ClientType).map((ClientType) => (<option key={ClientType} value={ClientType}>{ClientType}</option>))}</select>

                <div className="circle-b px2"><AiOutlineMail  /> </div>
                {errors?.email ? (<span className="red">{errors.email.message}</span>) : (<label htmlFor="email">Email</label>)}
                <input {...register("email")} className="input bx" name="email" type="email" placeholder="  Email..." />

                <div className="circle-b px3"><TfiUnlock/> </div>
                {errors?.password ? (<span className="red">{errors.password.message}</span>) : (<label htmlFor="password"> Password</label>)}
                <input {...register("password")} className="input bx" name="password" type="password" placeholder=" Password..." />

                <button className="animated-button dx" disabled={!isValid || isSubmitting}>Login</button>
                </div>

            </form>

        </div>
        </div>
    );
}

export default Login;