import React from "react";
import "./displayArea.css";
import Search from "../search/Search";
import Logs from "../logs/Logs";
import { useMyContext } from "../../context/MyProvider";

const DisplayArea = () => {
  return (
    <div className="displayAreaContainer">
      <Search />
      <Logs />
    </div>
  );
};

export default DisplayArea;
