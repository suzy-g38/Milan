import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../../../service/MilanApi";
import "../AuthPage.css";
import { Helmet } from "react-helmet-async";
import { showErrorToast, showSuccessToast } from "../../../utils/showToast";
import { FiArrowLeft, FiEye, FiEyeOff } from "react-icons/fi";
import useValidation from "../../../hooks/useValidation";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import AuthButton from "../../../components/Button/AuthButton";

function ClubLogin() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const callUserLoginAPI = async () => {
    const Data = await LoginUser(credentials);

    if (Data?.status === 201) {
      Cookies.set("token", Data?.data?.token);
      showSuccessToast(Data?.data?.message);

      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 3000);
    } else {
      showErrorToast(Data?.message);
      setCredentials({ email: "", password: "" });

      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const validationErrors = useValidation(credentials);

    if (validationErrors.length > 0) {
      validationErrors.forEach((error) => {
        showErrorToast(error.message);
      });
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    } else {
      callUserLoginAPI();
    }
  };

  const [passwordType, setPasswordType] = useState("password");

  const passwordToggle = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  };

  return (
    <>
      <Helmet>
        <title>Milan | User login</title>
        <meta
          name="description"
          content="Welcome to the User's login page. Login to Milan with your email and password."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      <ToastContainer />

      <div className="authpage_godparent">
        <div className="authpage_parent">
          <div className="authpage_leftdiv">
            <button
              className="btn authpage_floatingbtn"
              onClick={() => {
                navigate(
                  window.location.pathname.includes("register")
                    ? "/user/login"
                    : "/user/register",
                );
              }}
            >
              {window.location.pathname.includes("register")
                ? "Have an account? Login"
                : "Don't have an account? Register"}
            </button>
          </div>

          <div className="authpage_rightdiv authpage_logindiv">
            <button
              className="btn authpage_floatingbtn authpage_goback"
              onClick={() => {
                navigate(-1);
              }}
            >
              <FiArrowLeft style={{ fontSize: "15px" }} /> Go back
            </button>
            <form className="authform" onSubmit={handleSubmit}>
              <h1 className=""> Sign In</h1>

              <div className="authform_container mb-4">
                <label htmlFor="email-des" className="auth_label">
                  Email address
                </label>
                <input
                  type="email"
                  className=" form-control "
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  aria-label="Club email"
                  id="desktopUserEmail"
                  placeholder="peepal@farm.io"
                />
              </div>

              <div className="authform_container">
                <label htmlFor="password-des" className="auth_label">
                  Password
                </label>
                <input
                  type={passwordType}
                  className=" form-control "
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  id="desktopUserPassword"
                  placeholder="Strg@Pass#122&&S"
                />

                <div
                  onClick={passwordToggle}
                  className="toggle-button"
                  style={{ paddingTop: 5 }}
                >
                  {passwordType === "password" ? <FiEyeOff /> : <FiEye />}
                </div>
              </div>

              <small id="textDemo" className="form-text text-muted"></small>
              <br />

              <AuthButton isLoading={isLoading} goTo="/user" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ClubLogin;
