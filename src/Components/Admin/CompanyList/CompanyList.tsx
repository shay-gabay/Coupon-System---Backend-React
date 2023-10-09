import { useEffect, useState } from "react";
import "./CompanyList.css";
import axios from "axios";
import { CompanyModel } from "../../../Models/CompanyModel";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import urlService from "../../../Services/UrlService";
import store, { RootState } from "../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { deletedCompanyAction, gotAllCompaniesAction } from "../../../Redux/CompanyAppState";
import notifyService from "../../../Services/NotificationService";
import { Link } from "react-router-dom";

function CompanyList(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel[]>(store.getState().companyReducer.companies);
  const [selectedCompany, setSelectedCompany] = useState<CompanyModel | null>(null); 
  const total = useSelector((state: RootState) => state.companyReducer.companies.length)
  const dispatch = useDispatch();

  useEffect(() => {
      if (company?.length > 0) {
          return;
     }
    axios.get<CompanyModel[]>(`${urlService.admin}/company`)
      .then((res) => {
        console.log(res.data);
        setCompany(res.data);
        dispatch(gotAllCompaniesAction(res.data))
      })
      .catch((err) => console.log(err.data));
  }, []);

  const handleDeleteClick = (company: CompanyModel) => {
    setSelectedCompany(company); 
  };

  const handleDeleteConfirm = () => {
    if (selectedCompany) {
      const companyId = selectedCompany.id;

      axios
        .delete<CompanyModel>(`${urlService.admin}/company/${companyId}`)
        .then((res) => {
          const updatedCompanyList = company.filter((c) => c.id !== companyId);
          setCompany(updatedCompanyList);
          setSelectedCompany(null);
          dispatch(deletedCompanyAction(companyId));
          notifyService.success(`Company ${selectedCompany?.name} Deleted Successfully`);
        })
        .catch((err) => {
          console.error(err);
          notifyService.showErrorNotification(err.message || "Error");
        });
    }
  };

  const handleDeleteCancel = () => {
    setSelectedCompany(null);
  };

  return (
    <div className="Table">
      <h1>Company List</h1>
        <p className="total company-card">Total Companies :  { total ? <span>{total}</span> : <span> No Values </span> }</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Logo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>UPDATE</th>
            <th>DELETE</th>
          </tr>
        </thead>
        <tbody>
          {company.map((company, idx) => (
            <tr key={`company ${idx}`}>
              <td>{company.id}</td>
              <td>
                <img width={45} height={45} src={company.image} />
              </td>
              <td>{company.name}</td>
              <td>{company.email}</td>
              <td>{company.password}</td>
              <td>
                <Link to={"/UpdateCompany"}><button className="update">
                  <RxUpdate />
                </button></Link>
              </td>
              <td>
              <button className="delete" onClick={() => handleDeleteClick(company)}>
                  <RiDeleteBin5Fill />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedCompany && ( 
        <div className="confirmation-dialog">
          <p>Are you sure you want to delete {selectedCompany.name}?</p>
          <button className="yes-button" onClick={handleDeleteConfirm}>Yes</button>
          <button className="no-button" onClick={handleDeleteCancel}>No</button>
        </div>
      )}
    </div>
  );
}

export default CompanyList;
