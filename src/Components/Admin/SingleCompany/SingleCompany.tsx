import { useEffect, useState } from "react";
import "./SingleCompany.css";
import { CompanyModel } from "../../../Models/CompanyModel";
import CompanyCard from "../../Shared/Card/CompanyCard";
import notifyService from "../../../Services/NotificationService";
import { useDispatch, useSelector } from "react-redux";
import { gotSingleCompanyAction } from "../../../Redux/CompanyAppState";
import { RootState } from "../../../Redux/Store";
import webApiService from "../../../Services/WebApiService";
import { useParams } from "react-router-dom";

function SingleCompany(): JSX.Element {
  const params = useParams();
  const id = +(params.id || 0);
  const [company, setCompany] = useState<CompanyModel>();
  const [companyId, setCompanyId] = useState<number | undefined>(id);
  const [isValidInput, setIsValidInput] = useState(true);
  const [isLoading, setIsLoading] = useState(false); 
  const dispatch = useDispatch();
  const companyFromRedux = useSelector((state: RootState) => 
  state.companyReducer.companies.find((company) => company.id === companyId));

  const handleSubmit = () => {
    if (isLoading) return;

    setIsLoading(true);
    if (companyFromRedux) {
      setIsValidInput(true);
      setIsLoading(false);
      setCompany(companyFromRedux);
    } else {
      webApiService.getSingleCompany(companyId)
        .then((res) => {
          dispatch(gotSingleCompanyAction(res.data));
          setIsValidInput(true);
          setCompany(res.data);
        })
        .catch((err) => {
          notifyService.showErrorNotification(err);
          setIsValidInput(false);
        })
        .finally(() => {
          setIsLoading(false); 
        });
    }
  };


  useEffect(() => {
    if (id > 0) {
      handleSubmit();
    }
  }, [id]);


  return (
    <div>
      <h1 className="h1">Single Company</h1>
      <div className="input company-card">
        <h2>Please insert the ID of the company you want</h2>
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
        <button className="submit" onClick={handleSubmit}>
          Apply
        </button>
      </div>
      <p className="">{company && <CompanyCard company={company} />}</p>
    </div>
  );
}

export default SingleCompany;
