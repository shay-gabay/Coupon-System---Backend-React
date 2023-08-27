import "./AddCompany.css";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CompanyModel } from "../../../Models/CompanyModel";
import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import { addedCompanyAction } from "../../../Redux/CompanyAppState";
import { useDispatch } from "react-redux";

function AddCompany(): JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = zod.object({
    name: zod.string().nonempty("you must enter name"),
    email: zod.string().nonempty("you must enter email"),
    password: zod.string().nonempty("you must enter password"),
    image: zod.string().nonempty("you must insert company-logo"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<CompanyModel>({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
    axios
      .post<CompanyModel>(`${urlService.admin}/company`, data)
      .then((res) => {
        notifyService.success(`Company ${data.name} Added Successfully`);
        dispatch(addedCompanyAction(res.data));
        navigate("/admin");
      })
      .catch((err) => {
        console.error(err);
        notifyService.showErrorNotification(err);
      });
  };

  return (
    <div className="AddCompany">
      <h1 className="center">Add Company</h1>
      <form
        className="company-card width"
        onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}
      >
        {errors?.name ? (
          <span className="red">{errors.name.message}</span>
        ) : (
          <label htmlFor="name">Name</label>
        )}
        <input
          {...register("name")}
          className="input"
          name="name"
          type="text"
          placeholder="Name..."
        />

        {errors?.email ? (
          <span className="red">{errors.email.message}</span>
        ) : (
          <label htmlFor="email">Email</label>
        )}
        <input
          {...register("email")}
          className="input"
          name="email"
          type="email"
          placeholder="Email..."
        />

        {errors?.password ? (
          <span className="red">{errors.password.message}</span>
        ) : (
          <label htmlFor="password">Password</label>
        )}
        <input
          {...register("password")}
          className="input"
          name="password"
          type="password"
          placeholder="Password..."
        />

        {errors?.image ? (
          <span className="red">{errors.image.message}</span>
        ) : (
          <label htmlFor="image">Company Logo</label>
        )}
        <input
          {...register("image")}
          className="input"
          name="image"
          type="text"
          placeholder="Company Logo..."
        />

        <button
          className="animated-button button"
          disabled={!isValid || isSubmitting}
        >
          ADD
        </button>
      </form>
    </div>
  );
}

export default AddCompany;
function addedNewCompanyAction(company: any): any {
  throw new Error("Function not implemented.");
}

