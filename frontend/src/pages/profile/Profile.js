import { Avatar } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import Header from "../../components/header/Header";
import { Link } from "react-router-dom";

import "./profile.scss";

const Profile = () => {
  return (
    <Fragment>
      <Header />
      <div className="content">
        <h2>Personal Info</h2>
        <p>Basic info like your name and photo</p>
        <div className="profile">
          <div className="profileHeader">
            <div className="innerHeader">
              <h3>Profile</h3>
              <span>Some info may be visible to other people</span>
            </div>
            <div className="btnContainer">
              <Link to="/profile/edit" className="editlink">
                Edit
              </Link>
            </div>
          </div>

          <div className="profileContent first">
            <div className="profileItem ">
              <span className="field">Photo</span>
              <span className="text">
                {" "}
                <Avatar
                  sx={{
                    borderRadius: "5px",
                    width: 56,
                    height: 56,
                  }}
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                />
              </span>
            </div>
          </div>

          <div className="profileContent">
            <div className="profileItem">
              <span className="field">Name</span>
              <span className="text">Osaretin Igbinobaro</span>
            </div>
          </div>

          <div className="profileContent">
            <div className="profileItem">
              <span className="field">Bio</span>
              <span className="text">
                I am a fullstack Engineer (Javascript)
              </span>
            </div>
          </div>

          <div className="profileContent">
            <div className="profileItem">
              <span className="field">Phone</span>
              <span className="text">07030763334</span>
            </div>
          </div>

          <div className="profileContent">
            <div className="profileItem">
              <span className="field">Email</span>
              <span className="text">igbinobaroosaretin@gmail.com</span>
            </div>
          </div>

          <div className="profileContent last">
            <div className="profileItem">
              <span className="field">Password</span>
              <span className="text">*********</span>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Profile;
