import React, { useContext } from "react";
import { AuthContext } from "../shared/context/auth-context";

const Dashboard = () => {
  const auth = useContext(AuthContext);
  return (
    <React.Fragment>
      <p className="fw-normal m-0">Welcome</p>
      <span className="fs-4 text-primary mb-3 fw-bold">{auth.name}</span>
      <button className="btn btn-primary" onClick={auth.logout}>
        Logout
      </button>
    </React.Fragment>
  );
};

export default Dashboard;
