import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectAuth, logout } from "../features/authSlice";
import { toast } from "react-toastify";

const Dashboard = () => {
  const {username} = useAppSelector(selectAuth)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout=()=>{
    dispatch(logout());
    toast.success("User Logout Successfully");
    navigate("/auth");
  }
  return (
    <section
      className="vh-100 gradient-custom"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container h-70 vw-100" style={{ maxWidth: 500 }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-1g-6 col-xl-5"></div>
          <div 
            className="card bg-dark text-white"
            style={{ borderRadius: "1rem" }}
          >
            <div className="card-body p-4 text-center">
              <div className="mb-md-5 mt-md-4 pb-5">
                <h2 className="fw-bold mb-2">Welcome to the Dashboard</h2>
                <h4>Name : {username}</h4>
                <button
                  className="btn btn-outline-light btn-lg px-5 mt-3"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
