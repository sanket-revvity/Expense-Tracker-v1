import React from "react";
import logo from "../../assets/logo.svg";
import Button from "@mui/material/Button";
import { Link } from "react-router";

function Header() {
  return (
    <div className="flex justify-between items-center border-bottom shadow-md">
      <div>
        <img className="p-5" src={logo} alt="logo" width={100} height={100} />
      </div>
      <div className=" flex justify-end items-center border-bottom ">
        {" "}
        <Link to="/login" className="p-5">
          <Button
            sx={{
              backgroundColor: "#36454f   ",
              fontFamily: "Outfit",
              color: "white",
              "&:hover": { backgroundColor: "black" },
            }}
            variant="contained"
          >
            Login
          </Button>
        </Link>
        <Link to="/dashboard">
          <Button
            sx={{
              marginRight: "20px",
              backgroundColor: "#36454f   ",
              fontFamily: "Outfit",
              color: "white",
              "&:hover": { backgroundColor: "black" },
            }}
            variant="contained"
          >
            Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
