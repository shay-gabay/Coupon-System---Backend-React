import "./Login.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginReqModel } from "../../../Models/Login";
import webApiService from "../../../Services/WebApiService";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../../../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { loggedInAsAdmin } from "../../../Redux/GuardAppState";
function Login(): JSX.Element {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const schema = zod.object({
        email: zod.string().email("You should provide valid email"),
        password: zod.string().min(4, "Minimum 4 characters"),
    });

    const { register, handleSubmit,
        formState: { errors, isValid, isSubmitting } }
        = useForm<LoginReqModel>({ mode: "all", resolver: zodResolver(schema) });

    const onSubmit: SubmitHandler<LoginReqModel> = (data: LoginReqModel) => {

        return webApiService.login(data)
            .then(res => {
                dispatch(userLoggedIn(res.data));
                navigate("/todos")
                if (data.email === 'admin@admin.com') {
                    dispatch(loggedInAsAdmin());
                    console.log("Logged in as admin...");
                }

            })
            .catch(err => notifyService.error(err));

    };

    return (
        <div className="Login form-look-and-feel">
            <h1>Login</h1>
            <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>

                {(errors?.email) ? <span>{errors.email.message}</span> : <label htmlFor="email">Email</label>}
                <input {...register("email")} name="email" type="email" placeholder="Email..." />

                {(errors?.password) ? <span>{errors.password.message}</span> : <label htmlFor="password">Password</label>}
                <input {...register("password")} name="password" type="password" placeholder="Password..." />
                <button disabled={!isValid || isSubmitting}>Login</button>
            </form>
        </div>
    );
}

export default Login;
