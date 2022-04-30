import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Avatar } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import "./editprofile.scss";

const EditProfile = () => {
  return (
    <Fragment>
      <Header />
      <p className="back">
        <Link to="/profile" className="backlink">
          <ArrowBackIosIcon /> Back
        </Link>
      </p>
      <div className="content">
        <div className="profile">
          <div className="profileHeader">
            <div className="innerHeader">
              <h3>Change Info</h3>
              <span>Changes will be reflected to all services</span>
            </div>
          </div>

          <form className="editForm">
            <div className="profileImage">
              <div className="avatar">
                <Avatar
                  sx={{
                    borderRadius: "5px",
                    width: 70,
                    height: 70,
                  }}
                  alt="Remy Sharp"
                  src="https://material-ui.com/static/images/avatar/1.jpg"
                ></Avatar>{" "}
                <PhotoCameraIcon className="icon-camera" />
              </div>

              <input type="file" className="fileupload" />
            </div>
            <p>
              <label>Name</label>
              <input type="text" />
            </p>
            <p>
              <label>Bio</label>
              <textarea></textarea>
            </p>
            <p>
              <label>Phone</label>
              <input type="tel" />
            </p>
            <p>
              <label>Email</label>
              <input type="email" />
            </p>
            <p>
              <label>Password</label>
              <input type="password" />
            </p>

            <div className="btn">
              <button>Save</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
