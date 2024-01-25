import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit";
import React from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../services/authApi";
import { toast } from "react-toastify";
import { useAppDispatch } from "../app/hooks";
import { setUser } from "../features/authSlice";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Auth = () => {
  const [formValue, setFormValue] = useState(initialState);
  const { username, email, password } = formValue;
  const [showRegister, setShowRegister] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginUserMutation();
  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterUserMutation();

  const handleChange = (e: any) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  const handleLogin = async () => {
    if (email && password) {
      await loginUser({ email, password });
    } else {
      toast.error("Please fill all the input");
    }
  };
  const handleRegister = async() => {
    if (username && email && password) {
      await registerUser({ username, email, password });
    } else {
      toast.error("Please fill all the input");
    }
  };

  useEffect(() => {
    if (isLoginSuccess) {
      toast.success("User Login Successfully");
      dispatch(
        setUser({
          username: loginData.result.username,
          accessToken: loginData.accessToken,
        })
      );
      navigate("/dashboard");
    }
    if (isRegisterSuccess) {
      toast.success("User Register Successfully");
      dispatch(
        setUser({
          username: registerData.user.username,
          accessToken: registerData.accessToken,
        })
      );
      navigate("/dashboard");
    }
  }, [isLoginSuccess, isRegisterSuccess]);

  useEffect(()=>{
    if(isLoginError){
        toast.error((loginError as any).data.message )
    }
    if(isRegisterError){
        toast.error((registerError as any).data.message )
    }
  })
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
                <h2 className="fw-bold mb-2 text-uppercase">
                  {!showRegister ? "Login" : "Register"}
                </h2>
                <p className="text-white-50 mb-4">
                  {!showRegister
                    ? "Please Enter your email and password"
                    : "Please Enter user detail"}
                </p>
                {showRegister && (
                  <>
                    <div className="form-outline form-white mb-4">
                      <MDBInput
                        type="username"
                        name="username"
                        value={username}
                        onChange={handleChange}
                        label="username "
                        className="form-control form-control-lg"
                      />
                    </div>
                  </>
                )}

                <div className="form-outline form-white mb-4">
                  <MDBInput
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    label="Email"
                    className="form-control form-control-lg"
                  />
                </div>
                <div className="form-outline form-white mb-4">
                  <MDBInput
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    label="password"
                    className="form-control form-control-lg"
                  />
                </div>
                {!showRegister ? (
                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="button"
                    onClick={() => handleLogin()}
                  >
                    Login
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-light btn-lg px-5"
                    type="button"
                    onClick={() => handleRegister()}
                  >
                    Register
                  </button>
                )}
              </div>
              <div>
                <h5 className="mb-0">
                  {!showRegister ? (
                    <>
                      Don't have an account ?
                      <p
                        className="text-white-50 fw-bold"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowRegister(true)}
                      >
                        Sign Up
                      </p>
                    </>
                  ) : (
                    <>
                      Already have an account ?
                      <p
                        className="text-white-50 fw-bold"
                        style={{ cursor: "pointer" }}
                        onClick={() => setShowRegister(false)}
                      >
                        Login
                      </p>
                    </>
                  )}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Auth;
