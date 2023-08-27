import { useEffect, useState } from "react";
import "./CompanyDetails.css";
import axios from "axios";
import { CompanyModel } from "../../../Models/CompanyModel";
import urlService from "../../../Services/UrlService";
import CompanyCard from "../../Shared/Card/CompanyCard";
import notifyService from "../../../Services/NotificationService";

function CompanyDetails(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel[]>([]);
  const companyId = 1;
  useEffect(() => {
    axios
      .get<CompanyModel[]>(urlService.company + `/${companyId}`)
      .then((res) => {
        console.log(res.data);
        setCompany([res.data]);
      })
      .catch((err) => {
        notifyService.showErrorNotification(err.data)});
  }, []);

  return (
    <div>
      <h1 className="h1">Company Details</h1>
      {company.map((c, idx) => (
        <CompanyCard key={c.name + " " + idx.toString()} company={c} />
      ))}
    </div>
  );
}

export default CompanyDetails;
