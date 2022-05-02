import React, { useState } from "react";
import "../signup/signup.scss";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../actions";
import { toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const { isLoggedIn: isAuthenticated, isUpdated } = useSelector(
    (state) => state.user
  );

  if (isAuthenticated && !isUpdated) {
    navigate("/profile/edit");
  } else if (isAuthenticated) {
    navigate("/profile", { replace: true });
  }

  const onChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginData.email, loginData.password));
  };

  return (
    <div className="center-box">
      <div className="inner-box">
        <h4>daba Dev Task</h4>
        <h2>Login</h2>

        <form className="form">
          <p>
            <EmailIcon />
            <input
              type="email"
              required
              name="email"
              value={loginData.email}
              placeholder="Email"
              onChange={onChange}
            />
          </p>

          <p>
            <LockIcon />
            <input
              type="password"
              required
              name="password"
              value={loginData.password}
              placeholder="password"
              onChange={onChange}
            />
          </p>

          <p className="btn">
            <button onClick={onSubmit}>Login</button>
          </p>

          <span className="text">Or with these social profile</span>

          <div className="social">
            <GoogleIcon className="icon" />
            <FacebookIcon className="icon" />
            <TwitterIcon className="icon" />
            <GitHubIcon className="icon" />
          </div>

          <span className="linkspan">
            Dont have an account yet?{" "}
            <span>
              <Link to="/signup" className="link">
                Register
              </Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
