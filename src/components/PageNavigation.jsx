import React from "react";
import { Link } from "react-router-dom";

const PageNavigation = ({ title }) => {
  return (
    <>
      <Link to={"/"} style={{ textDecoration: "none" }}>
        Home
      </Link>
      | {title}
    </>
  );
};

export default PageNavigation;
