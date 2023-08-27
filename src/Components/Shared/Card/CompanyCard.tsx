import { CompanyModel } from "../../../Models/CompanyModel";

interface CompanyCardProps {
  company?: CompanyModel;
}

function CompanyCard(props: CompanyCardProps): JSX.Element {
  return (
    <div className="company-card">
      <div className="CompanyCard">
        <img src={props?.company?.image} alt="Company" height={200} width={200} />
        <div className="ignore">
          <p>
            <div className="company-name">
              # {props?.company?.id} {props?.company?.name}
            </div>
          </p>
          <div className="company-info">
            <p><b>Email: </b>{props?.company?.email}</p>
            <p><b>Password: </b>{props?.company?.password}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
