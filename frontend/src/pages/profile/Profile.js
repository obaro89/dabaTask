import { Avatar } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import Header from "../../components/header/Header";
import { Link, useNavigate } from "react-router-dom";

import "./profile.scss";
import { useSelector } from "react-redux";
import UserAvatar from "../../components/avatar/UserAvatar";
import Spinner from "../../components/spinner/Spinner";

const Profile = () => {
  const navigate = useNavigate();
  const {
    isLoggedIn: isAuthenticated,
    photo,
    name,
    bio,
    phone,
    email,
    username,
    lastlogin,
    isLoading,
    isUpdated,
  } = useSelector((state) => state.user);

  if (!isLoading && isAuthenticated && !isUpdated) {
    navigate("/profile/edit");
  } else if (!isLoading && !isAuthenticated) {
    navigate("/login", { replace: true });
  }

  if (isLoading && (!name || !email)) {
    return <Spinner />;
  } else {
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
                  <UserAvatar
                    styles={{
                      borderRadius: "5px",
                      width: 64,
                      height: 64,
                    }}
                    name={name || email}
                  />
                </span>
              </div>
            </div>

            <div className="profileContent">
              <div className="profileItem">
                <span className="field">Name</span>
                <span className="text">{name}</span>
              </div>
            </div>

            <div className="profileContent">
              <div className="profileItem">
                <span className="field">Bio</span>
                <span className="text">{bio}</span>
              </div>
            </div>

            <div className="profileContent">
              <div className="profileItem">
                <span className="field">Phone</span>
                <span className="text">{phone}</span>
              </div>
            </div>

            <div className="profileContent">
              <div className="profileItem">
                <span className="field">Email</span>
                <span className="text">{email}</span>
              </div>
            </div>

            <div className="profileContent">
              <div className="profileItem">
                <span className="field">Password</span>
                <span className="text">*********</span>
              </div>
            </div>
            <div className="profileContent last">
              <div className="profileItem">
                <span className="field">Last Login</span>
                <span className="text">{lastlogin}</span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

export default Profile;
