import { useEffect, useState } from "react"; 
import "./UpdateCompany.css";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { CompanyModel } from "../../../Models/CompanyModel";
import { gotSingleCompanyAction, updatedCompanyACtion } from "../../../Redux/CompanyAppState";
import webApiService from "../../../Services/WebApiService";

function UpdateCompany(): JSX.Element {

  const [isValidInput, setIsValidInput] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  const [companyId, setCompanyId] = useState<number>(id);
 
  const schema = zod.object({
    id: zod.number(),
    name: zod.string().nonempty("you must enter name"),
    email: zod.string().nonempty("you must enter email"),
    password: zod.string().min(4,"minimum 4 characters").nonempty("you must enter password"),
    image: zod.string().nonempty("you must insert company-logo"),
  });

  const { register, handleSubmit, setValue, formState: { errors, isValid, isSubmitting },} = 
  useForm<CompanyModel>({ mode: "all", resolver: zodResolver(schema) });
  
    const handleSubmit2 = () => { 
     webApiService.getSingleCompany(companyId)
      .then((res) => {
        const companyData = res.data;
        console.log(companyData);
        setValue("id", companyData.id);
        setValue("name", companyData.name);
        setValue("email", companyData.email);
        setValue("image", companyData.image);
        setValue("password", companyData.password);
        dispatch(gotSingleCompanyAction(res.data));
      })
      .catch((err) => {
        notifyService.showErrorNotification(err);
      });
    []};

  const onSubmit: SubmitHandler<CompanyModel> = (data: CompanyModel) => {
    webApiService.updateCompany(companyId,data)
      .then((res) => {
        notifyService.success(`Company ${data.name} Updated Successfully`);
        dispatch(updatedCompanyACtion(res.data));
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
      <h1 className="center">Update Company</h1>
     {id === 0 ? (
     <div  className="input company-card">
            <h2>Please insert the ID of the company you want to update</h2>
            <input
             className={`input-window ${!isValidInput ? "input-error" : ""}`}
             type="number"
             min="1"
             placeholder="ID..."
             value={companyId}
             onChange={(e) => {
             setCompanyId(Number(e.target.value));
             setIsValidInput(true);
          }}
        />
        <button className="submit" onClick={handleSubmit2}>
          Apply
        </button>
      </div>  ) : null} 
      <form className="company-card width"  onSubmit={handleSubmit(onSubmit)}>
              
              <label htmlFor="id">Company Id</label>
              <input {...register("id")} className="circle" name="id" type="text" value={companyId}  disabled={true} />

              {(errors?.name) ? <span className="red">{errors.name.message}</span> : <label htmlFor="name">Name</label>}
	     	      <input {...register("name")} className="input marg colorR" name="name" type="text" placeholder="Name..."   disabled={true}/>
			
		          {(errors?.email) ? <span className="red">{errors.email.message}</span> : <label htmlFor="email">Email</label>}
              <input  {...register("email")} className="input marg" name="email" type="email" placeholder="Email..." />

			        {(errors?.image) ? <span className="red">{errors.image.message}</span> : <label htmlFor="image">Company Logo</label>}
			        <input {...register("image")}  className="input marg" name="image" type="text" placeholder="Company Logo..." />

              {(errors?.password) ? <span className="red">{errors.password.message}</span> : <label htmlFor="password">Password</label>}
              <input  {...register("password")}  className="input marg" name="password" type="password" placeholder="Password..." />

                <button className="animated-button button" disabled={!isValid || isSubmitting}>Update</button>
      </form>
    </div>
  );
}

export default UpdateCompany;