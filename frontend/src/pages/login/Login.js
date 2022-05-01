import React, { useEffect } from "react";
import "../signup/signup.scss";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getProfile, login, signup, updateUser } from "../../actions";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(login("igbinobaro@gmail.com", "hatcat"));
    //dispatch(signup("igbino@gmail.com", "hatcat"));
    dispatch(
      updateUser({
        name: "igbinobaro",
        phone: "07030763334",
        bio: "I am a Senior",
      })
    );

    //dispatch(getProfile());
  }, []);

  return (
    <div className="center-box">
      <div className="inner-box">
        <h4>daba Dev Task</h4>
        <h2>Login</h2>

        <form className="form">
          <p>
            <EmailIcon />
            <input type="email" />
          </p>

          <p>
            <LockIcon />
            <input type="password" />
          </p>

          <p className="btn">
            <button>Login</button>
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
