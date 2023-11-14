import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import { CompanyModel } from "../../../Models/CompanyModel";
import CompanyCard from "../../Shared/Card/CompanyCard";
import notifyService from "../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { gotSingleCompanyAction } from "../../../Redux/CompanyAppState";
import { useParams } from "react-router-dom";
import webApiService from "../../../Services/WebApiService";

function CompanyDetails(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel>();
  const dispatch = useDispatch();
  const params = useParams();
  const id = +(params.id || 0);
  
 
  useEffect(() => {
    webApiService.getCompanyDetails(id)
      .then((res) => {
        setCompany(res.data);
        dispatch(gotSingleCompanyAction(res.data))
      })
      .catch((err) => {
       notifyService.showErrorNotification(err.data)});
  }, []);

  return (
    <div>
      <h1 className="h1">Company Details</h1>
      {company && <CompanyCard company={company} />}
      
    </div>
  );
}

export default CompanyDetails;
