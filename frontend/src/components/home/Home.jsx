import React, { useEffect } from "react";
import FilterList from "../filterList/FilterList";
import DisplayArea from "../displayArea/DisplayArea";
import Header from "../header/Header";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/MyProvider";
import { Input, Button } from "@chakra-ui/react";

const Home = () => {
  const { user } = useMyContext();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authorized (based on your token check)
    const isAuthorized = !!localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    // If not authorized, redirect to the login page
    if (!isAuthorized) {
      navigate("/login");
    }

    if (user && user.role !== "admin") {
      navigate("/login");
    }
  }, []);

  // Render the home component content if authorized
  return (
    <div className="home">
      <Header />
      <DisplayArea />
      <FilterList />
    </div>
  );
};

export default Home;
