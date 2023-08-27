import "./DeleteCompany.css";
import { useState } from "react";
import axios from "axios";
import { CompanyModel } from "../../../Models/CompanyModel";
import CompanyCard from "../../Shared/Card/CompanyCard";
import urlService from "../../../Services/UrlService";
import notifyService from "../../../Services/NotificationService";
import store from "../../../Redux/Store";
import { deletedCompanyAction } from "../../../Redux/CompanyAppState";
import { useDispatch } from "react-redux";
// import { date } from "zod";

function DeleteCompany(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel | undefined>();
  const [companyId, setCompanyId] = useState<number>(0);
  const [isValidInput, setIsValidInput] = useState(true);
 const dispatch = useDispatch();
  const n = 20;

  const handleSubmit = () => {
    if (companyId <= n && companyId >= 1) {
      axios
        .get<CompanyModel>(`${urlService.admin}/company/${companyId}`)
        .then((res) => {
          setCompany(res.data);
          setIsValidInput(true);
        })
        .catch((err) => {
          notifyService.showErrorNotification(err);
        });
    } else {
      setIsValidInput(false);
    }
  };

  const DeleteSubmit = () => {
    axios
      .delete<CompanyModel>(`${urlService.admin}/company/${companyId}`)
      .then((res) => {
        setCompany(res.data);
        dispatch(deletedCompanyAction(companyId));
        notifyService.success(`Company ${company?.name} Deleted Successfully`);
      })
      .catch((err) => {
        console.error(err);
        notifyService.showErrorNotification(err.message || "Error");
      });
  };

  const handleNoButtonClick = () => {
    setCompany(undefined);
    setCompanyId(0);
    setIsValidInput(true);
    notifyService.error("Company Not Deleted");
  };

  // const [isSquare, setIsSquare] = useState(true);

  // const toggleButton = () => {
  //   setIsSquare(!isSquare);
  // };

  return (
    <div>
      {/* <button className="toggle-button" onClick={toggleButton}>
      {isSquare ? <div className="square"></div> : <div className="checkmark">✓</div>}
    </button> */}

      <h1 className="h1">Delete Company</h1>
      <div className="input company-card">
        <h2>Please insert the ID of the company you want to Delete</h2>
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
      {company && <CompanyCard company={company} />}
      {company && (
        <p className="spc company-card">
          <b> Are you sure you want to delete this company ? </b>
          <button className="yes-button" onClick={DeleteSubmit}>
            Yes
          </button>
          <button className="no-button" onClick={handleNoButtonClick}>
            No
          </button>
        </p>
      )}
    </div>
  );
}
// conditional rendering - { flag &&  (---) ? --- : --- }
export default DeleteCompany;
