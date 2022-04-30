import React from "react";
import "./signup.scss";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import GoogleIcon from "@mui/icons-material/Google";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="center-box">
      <div className="inner-box">
        <h4>daba Dev Task</h4>
        <h2>Join thousands of learners from around the world</h2>
        <p className="intro">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </p>

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
            <button>Start coding now</button>
          </p>

          <span className="text">Or with these social profile</span>

          <div className="social">
            <GoogleIcon className="icon" />
            <FacebookIcon className="icon" />
            <TwitterIcon className="icon" />
            <GitHubIcon className="icon" />
          </div>

          <span className="linkspan">
            Already a member?{" "}
            <span>
              <Link to="/login" className="link">
                Login
              </Link>
            </span>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
