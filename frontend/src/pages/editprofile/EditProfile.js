import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import React from "react";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import "./editprofile.scss";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../actions";
import { toast } from "react-toastify";
import UserAvatar from "../../components/avatar/UserAvatar";
import Spinner from "../../components/spinner/Spinner";

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const [showPassword, setShowPassword] = React.useState(false);

  if (!isLoading && !isAuthenticated) {
    navigate("/login", { replace: true });
  }

  let [userData, setUserData] = React.useState({
    photo: photo || "",
    name: name || "",
    bio: bio || "",
    phone: phone || "",
    email: email || "",
    username: username || "",
  });

  const [passwords, setPasswords] = React.useState({
    password: "",
    cpassword: "",
  });

  const onChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };
  const onChangePwd = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (passwords.password != passwords.cpassword) {
      return toast.error("passwords must match");
    }
    userData = {
      ...userData,
      password,
    };

    dispatch(updateUser(userData));
  };

  if (isLoading && (!name || !email)) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <Header />
        <p className="back">
          {isUpdated && (
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
                  <UserAvatar
                    styles={{
                      borderRadius: "5px",
                      width: 64,
                      height: 64,
                    }}
                    name={name || email}
                  />{" "}
                  <PhotoCameraIcon className="icon-camera" />
                </div>

                <input type="file" className="fileupload" disabled />
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
                  value={passwords.password}
                  onChange={onChangePwd}
                />
              </p>
              <p className="cpassword">
                <label>Confirm password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="cpassword"
                  value={passwords.cpassword}
                  onChange={onChangePwd}
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
  }
};

export default EditProfile;
