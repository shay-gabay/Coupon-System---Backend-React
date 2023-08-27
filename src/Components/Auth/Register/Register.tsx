import "./Register.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterDetailsModel, RegisterReqModel } from "../../../Models/Register";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useNavigate } from "react-router-dom";
function Register(): JSX.Element {

    const navigate = useNavigate();

    const schema = zod.object({
        email: zod.string().email(),
        password: zod.string().min(4),
        confirm: zod.string().min(4),
    }).refine(value => value.password === value.confirm, {
        message: "Passwords must match",
        path: ['confirm'],
    })


    const { register, handleSubmit, formState: { errors, isValid, isSubmitting } }
        = useForm<RegisterDetailsModel>({ mode: "all", resolver: zodResolver(schema) });


    const onSubmit: SubmitHandler<RegisterDetailsModel> = (data: RegisterDetailsModel) => {

        const reqBody = { "email": data.email, "password": data.password } as RegisterReqModel;

        return webApiService.register(reqBody)
            .then(() => {
                navigate("/login");
            })
            .catch(err => notifyService.error(err))

    };

    return (
        <div className="Register form-look-and-feel">
            <h1>Register</h1>
            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>

                {(errors?.email) ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} name="email" type="email" placeholder="Email..." />

                {(errors?.password) ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} name="password" type="password" placeholder="Password..." />


                {(errors?.confirm) ? <span>{errors.confirm.message}</span> : <label htmlFor="confirm">Confirm Password</label>}
                <input {...register("confirm")} name="confirm" type="password" placeholder="Confirm password..." />

                <button disabled={!isValid || isSubmitting} >Register</button>

            </form>
        </div>
    );
}

export default Register;
