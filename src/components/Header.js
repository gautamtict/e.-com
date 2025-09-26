import React from "react";
import PersonIcon from "@mui/icons-material/Person";
export default function Header() {
  return (
    <header className="site-header">
      <div className="topbar">
        <a
          href="https://connect.clo-set.com"
          className="logo"
          style={{
            backgroundImage:
              'url("https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg")',
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "100px", // adjust as needed
            height: "50px", // adjust as needed
          }}
        >
          {/* CONNECT */}
        </a>

        <nav className="navlinks">
          <a className="active">Store</a>
          <a>Gallery</a>
          <a>Community</a>
        </nav>

        <div className="user-actions">
          {/* <button className="upload-btn">Upload</button> */}
          <PersonIcon />
          {/* <img
            src="https://via.placeholder.com/32"
            alt="profile"
            className="avatar"
          /> */}
        </div>
      </div>
    </header>
  );
}
