import { useEffect, useState } from "react";
import "./CompanyList.css";
import axios from "axios";
import { CompanyModel } from "../../../Models/CompanyModel";
import { RxUpdate } from "react-icons/rx";
import { RiDeleteBin5Fill } from "react-icons/ri";
import urlService from "../../../Services/UrlService";
import { Link } from "react-router-dom";
import store, { RootState } from "../../../Redux/Store";
import { useDispatch, useSelector } from "react-redux";
import { gotAllCompaniesAction } from "../../../Redux/CompanyAppState";

function CompanyList(): JSX.Element {
  const [company, setCompany] = useState<CompanyModel[]>(store.getState().companyReducer.companies);
  // const [companyCount,setCompanyCount] = useState<number>();
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

    //  axios.get<number>(`${urlService.admin}/companies/count`)
    //  .then((res) => { 
    //   setCompanyCount(res.data)
    // })
    // .catch((err) => console.log(err))


  return (
    <div className="Table">
      <h1>Company List</h1>
        <p className="total company-card">Total Companies : { total ? <span>{total}</span> : <span>no values</span> }</p>
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
                <button className="update">
                  <RxUpdate />
                </button>
              </td>
              <td>
                <button className="delete">
                  <RiDeleteBin5Fill />
                </button>
                <Link to={`/company/DeleteCompany/:${company.id}`}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CompanyList;
