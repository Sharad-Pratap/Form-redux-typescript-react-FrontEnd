// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { MDBInput } from "mdb-react-ui-kit";
// import React from "react";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "../services/authApi";
// import { toast } from "react-toastify";
// import { useAppDispatch } from "../app/hooks";
// import { setUser } from "../features/authSlice";

// const initialState = {
//   username: "",
//   email: "",
//   password: "",
// };

// const Auth = () => {
//   const [formValue, setFormValue] = useState(initialState);
//   const { username, email, password } = formValue;
//   const [showRegister, setShowRegister] = useState(false);
//   const dispatch = useAppDispatch();
//   const navigate = useNavigate();
//   const [
//     loginUser,
//     {
//       data: loginData,
//       isSuccess: isLoginSuccess,
//       isError: isLoginError,
//       error: loginError,
//     },
//   ] = useLoginUserMutation();
//   const [
//     registerUser,
//     {
//       data: registerData,
//       isSuccess: isRegisterSuccess,
//       isError: isRegisterError,
//       error: registerError,
//     },
//   ] = useRegisterUserMutation();

//   const handleChange = (e: any) => {
//     setFormValue({ ...formValue, [e.target.name]: e.target.value });
//   };
//   const handleLogin = async () => {
//     if (email && password) {
//       await loginUser({ email, password });
//     } else {
//       toast.error("Please fill all the input");
//     }
//   };
//   const handleRegister = async() => {
//     if (username && email && password) {
//       await registerUser({ username, email, password });
//     } else {
//       toast.error("Please fill all the input");
//     }
//   };

//   useEffect(() => {
//     if (isLoginSuccess) {
//       toast.success("User Login Successfully");
//       dispatch(
//         setUser({
//           username: loginData.result.username,
//           accessToken: loginData.accessToken,
//         })
//       );
//       navigate("/dashboard");
//     }
//     if (isRegisterSuccess) {
//       toast.success("User Register Successfully");
//       dispatch(
//         setUser({
//           username: registerData.user.username,
//           accessToken: registerData.accessToken,
//         })
//       );
//       navigate("/dashboard");
//     }
//   }, [isLoginSuccess, isRegisterSuccess]);

//   useEffect(()=>{
//     if(isLoginError){
//         toast.error((loginError as any).data.message )
//     }
//     if(isRegisterError){
//         toast.error((registerError as any).data.message )
//     }
//   })
//   return (
//     <section
//       className="vh-100 gradient-custom"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div className="container h-70 vw-100" style={{ maxWidth: 500 }}>
//         <div className="row d-flex justify-content-center align-items-center h-100">
//           <div className="col-12 col-md-8 col-1g-6 col-xl-5"></div>
//           <div
//             className="card bg-dark text-white"
//             style={{ borderRadius: "1rem" }}
//           >
//             <div className="card-body p-4 text-center">
//               <div className="mb-md-5 mt-md-4 pb-5">
//                 <h2 className="fw-bold mb-2 text-uppercase">
//                   {!showRegister ? "Login" : "Register"}
//                 </h2>
//                 <p className="text-white-50 mb-4">
//                   {!showRegister
//                     ? "Please Enter your email and password"
//                     : "Please Enter user detail"}
//                 </p>
//                 {showRegister && (
//                   <>
//                     <div className="form-outline form-white mb-4">
//                       <MDBInput
//                         type="username"
//                         name="username"
//                         value={username}
//                         onChange={handleChange}
//                         label="username "
//                         className="form-control form-control-lg"
//                       />
//                     </div>
//                   </>
//                 )}

//                 <div className="form-outline form-white mb-4">
//                   <MDBInput
//                     type="email"
//                     name="email"
//                     value={email}
//                     onChange={handleChange}
//                     label="Email"
//                     className="form-control form-control-lg"
//                   />
//                 </div>
//                 <div className="form-outline form-white mb-4">
//                   <MDBInput
//                     type="password"
//                     name="password"
//                     value={password}
//                     onChange={handleChange}
//                     label="password"
//                     className="form-control form-control-lg"
//                   />
//                 </div>
//                 {!showRegister ? (
//                   <button
//                     className="btn btn-outline-light btn-lg px-5"
//                     type="button"
//                     onClick={() => handleLogin()}
//                   >
//                     Login
//                   </button>
//                 ) : (
//                   <button
//                     className="btn btn-outline-light btn-lg px-5"
//                     type="button"
//                     onClick={() => handleRegister()}
//                   >
//                     Register
//                   </button>
//                 )}
//               </div>
//               <div>
//                 <h5 className="mb-0">
//                   {!showRegister ? (
//                     <>
//                       Don't have an account ?
//                       <p
//                         className="text-white-50 fw-bold"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => setShowRegister(true)}
//                       >
//                         Sign Up
//                       </p>
//                     </>
//                   ) : (
//                     <>
//                       Already have an account ?
//                       <p
//                         className="text-white-50 fw-bold"
//                         style={{ cursor: "pointer" }}
//                         onClick={() => setShowRegister(false)}
//                       >
//                         Login
//                       </p>
//                     </>
//                   )}
//                 </h5>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Auth;

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
import { useFormik } from "formik";
import * as Yup from "yup";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface LoginFormValues {
  email: string;
  password: string;
  username?: string; // If 'username' is optional in your form
}
interface ApiResponse {
  result: {
    username: string;
    email: string;
    password?: string;
  };
  accessToken: string;
}
const initialState = {
  username: "",
  email: "",
  password: "",
};

const Auth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showRegister, setShowRegister] = useState(false);
  const [loginUser ,{
          data: loginData,
          isSuccess: isLoginSuccess,
          isError: isLoginError,
          error: loginError,
        },] = useLoginUserMutation();
  const [registerUser,
        {
          data: registerData,
          isSuccess: isRegisterSuccess,
          isError: isRegisterError,
          error: registerError,
        },] = useRegisterUserMutation();

  const formik = useFormik({
    initialValues: initialState,
    validationSchema: Yup.object({
      username: showRegister ? Yup.string().required("Required") : Yup.string(),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      if (showRegister) {
        await handleRegister(values);
      } else {
        await handleLogin(values);
      }
    },
  });

  const handleLogin = async (values: LoginFormValues) => {
    const { email, password } = values;
    if (email && password) {
      try {
        const response = await loginUser({ email, password });

        if ("data" in response) {
          // Successful response
          handleLoginSuccess(response.data);
        } else if ("error" in response) {
          // Error response
          handleLoginError(response.error);
        } else {
          // Handle other cases if necessary
          console.error("Unexpected response structure", response);
        }
      } catch (error) {
        // Handle other unexpected errors
        console.error("Unexpected error", error);
      }
    } else {
      toast.error("Please fill all the input");
    }
  };

  const handleRegister = async (values: LoginFormValues) => {
    const { username, email, password } = values;
    if (username && email && password) {
      try {
        const response = await registerUser({ username, email, password });

        if ("data" in response) {
          handleRegisterSuccess(response.data);
        } else {
          // Handle unexpected response
          console.error("Unexpected response structure", response);
        }
      } catch (error) {
        handleRegisterError(error);
      }
    } else {
      toast.error("Please fill all the input");
    }
  };

  const handleLoginSuccess = (data: ApiResponse) => {
    toast.success("User Login Successfully");
    dispatch(
      setUser({
        username: data.result.username,
        accessToken: data.accessToken,
      })
    );
    navigate("/dashboard");
  };

  const handleRegisterSuccess = (data: {
    user: { username: string };
    accessToken: string;
  }) => {
    toast.success("User Register Successfully");
    dispatch(
      setUser({
        username: data.user.username,
        accessToken: data.accessToken,
      })
    );
    navigate("/dashboard");
  };

  const handleLoginError = (error: any) => {
    toast.error(error.data.message);
  };

  const handleRegisterError = (error: any) => {
    if (error.data && error.data.message) {
      toast.error(error.data.message);
    }
  };

  useEffect(() => {
    if (formik.submitCount > 0) {
      if (formik.errors.username) {
        toast.error(formik.errors.username);
      }
      if (formik.errors.email) {
        toast.error(formik.errors.email);
      }
      if (formik.errors.password) {
        toast.error(formik.errors.password);
      }
    }
  }, [formik.errors, formik.submitCount]);

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
                <form onSubmit={formik.handleSubmit}>
                  {showRegister && (
                    <>
                      <div className="form-outline form-white mb-4">
                        <MDBInput
                          type="username"
                          name="username"
                          value={formik.values.username}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          label="Username "
                          className="form-control form-control-lg"
                        />
                        {formik.touched.username && formik.errors.username && (
                          <div className="text-danger">
                            {formik.errors.username}
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="Email"
                      className="form-control form-control-lg"
                    />
                    {formik.touched.email && formik.errors.email && (
                      <div className="text-danger">{formik.errors.email}</div>
                    )}
                  </div>
                  <div className="form-outline form-white mb-4">
                    <MDBInput
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      label="Password"
                      className="form-control form-control-lg"
                    />
                    {formik.touched.password && formik.errors.password && (
                      <div className="text-danger">
                        {formik.errors.password}
                      </div>
                    )}
                  </div>
                  {!showRegister ? (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Register
                    </button>
                  )}
                </form>
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
