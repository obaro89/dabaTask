import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Avatar } from "@mui/material";
import React from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import "./editprofile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions";
import { toast } from "react-toastify";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    isLoggedIn: isAuthenticated,
    profile,
    isLoading: loading,
  } = useSelector((state) => state.user);

  const [isLoading, setLoading] = React.useState(loading);
  const [showPassword, setShowPassword] = React.useState(false);

  if (!isLoading && !isAuthenticated) {
    navigate("/login", { replace: true });
  }

  const [userData, setUserData] = React.useState({
    photo: profile.photo ? profile.photo : "",
    name: profile.name ? profile.name : "",
    bio: profile.bio ? profile.bio : "",
    phone: profile.phone ? profile.phone : "",
    email: profile.email ? profile.email : "",
    username: profile.username ? profile.username : "",
    cpassword: "",
    password: "",
  });

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (userData.password !== userData.cpassword) {
      return toast.error("passwords must match");
    }
    delete userData.cpassword;
    dispatch(updateUser(userData));
  };

  return (
    <Fragment>
      <Header />
      <p className="back">
        {profile.isUpdated && (
          <Link to="/profile" className="backlink">
            <ArrowBackIosIcon /> Back
          </Link>
        )}
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
              <input
                type="text"
                name="name"
                value={userData.name}
                placeholder="Enter your name..."
                required
                onChange={onChange}
              />
            </p>
            <p>
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={userData.username}
                placeholder="Enter your username..."
                required
                onChange={onChange}
              />
            </p>
            <p>
              <label>Bio</label>
              <textarea
                name="bio"
                value={userData.bio}
                placeholder="Enter your bio..."
                onChange={onChange}
              ></textarea>
            </p>
            <p>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={userData.phone}
                placeholder="Enter your phone number..."
                onChange={onChange}
              />
            </p>
            <p>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={userData.email}
                placeholder="Enter a valid Email"
                required
                onChange={onChange}
              />
            </p>
            <p>
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={userData.password}
                onChange={onChange}
              />
            </p>
            <p className="cpassword">
              <label>Confirm password</label>
              <input
                type={showPassword ? "text" : "password"}
                name="cpassword"
                value={userData.cpassword}
                onChange={onChange}
              />
            </p>
            <span>
              <input
                onChange={() => setShowPassword(!showPassword)}
                type="checkbox"
                style={{
                  marginRight: "10px",
                }}
              />
              <label>Show passwords</label>
            </span>

            <div className="btn">
              <button onClick={onSubmit}>Save</button>
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default EditProfile;
