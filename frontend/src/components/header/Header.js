import React from "react";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./header.scss";
import { Popover } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "../../actions";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Fragment } from "react";
import UserAvatar from "../avatar/UserAvatar";
import Spinner from "../spinner/Spinner";

const Header = () => {
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
  } = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const signOut = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  if (isLoading && (!name || !email)) {
    return <Spinner />;
  } else {
    return (
      <header>
        <h5 className="logo">DABA Dev Task</h5>
        <div className="profile">
          {isAuthenticated && !isLoading && (
            <Fragment>
              <UserAvatar
                styles={{
                  borderRadius: "5px",
                }}
                name={name || email}
              />
              <span className="name">{username || email}</span>
            </Fragment>
          )}
          <div>
            <ArrowDropDownOutlinedIcon
              className="icon"
              onClick={handleClick}
              aria-describedby={id}
            />
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorReference="anchorPosition"
              anchorPosition={{ top: 83, left: 1800 }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
            >
              <ul className="profileList">
                <p>
                  <li>
                    <AccountCircleIcon className="icon" />

                    <span>
                      <Link to="/profile">Profile</Link>
                    </span>
                  </li>
                  <li>
                    <PeopleIcon className="icon" />
                    <span>Group Chat</span>
                  </li>
                </p>

                <li className="logout">
                  <LogoutIcon className="icon" />
                  <span onClick={signOut}>Logout</span>
                </li>
              </ul>
            </Popover>
          </div>
        </div>
      </header>
    );
  }
};

export default Header;
