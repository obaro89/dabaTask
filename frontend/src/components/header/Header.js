import React from "react";
import Avatar from "@mui/material/Avatar";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import "./header.scss";
import { Popover } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <header>
      <h5 className="logo">daba Dev Task</h5>
      <div className="profile">
        <Avatar
          sx={{
            borderRadius: "5px",
          }}
          alt="Remy Sharp"
          src="https://material-ui.com/static/images/avatar/1.jpg"
        />
        <span>Osaretin</span>
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
                  <span>Profile</span>
                </li>
                <li>
                  <PeopleIcon className="icon" />
                  <span>Group Chat</span>
                </li>
              </p>

              <li className="logout">
                <LogoutIcon className="icon" />
                <span>Logout</span>
              </li>
            </ul>
          </Popover>
        </div>
      </div>
    </header>
  );
};

export default Header;
