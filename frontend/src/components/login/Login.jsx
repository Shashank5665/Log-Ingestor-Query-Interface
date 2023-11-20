import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useMyContext } from "../../context/MyProvider";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMesssage] = useState("");
  const { setUser } = useMyContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    const response = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const jsonData = await response.json();
    setUser(jsonData);

    if (response.ok) {
      localStorage.setItem("token", jsonData.token);
      localStorage.setItem("user", JSON.stringify(jsonData));
      if (jsonData.role === "admin") {
        navigate("/home");
      } else {
        setMesssage("Only admins are authorized use the Log Query Interface");
      }
    } else {
      setMesssage("Login failed");
    }
    console.log("Login info : ", jsonData);
  };

  return (
    <div className="loginContainer">
      <p
        style={{
          fontSize: "3em",
        }}
      >
        Login
      </p>
      <form onSubmit={handleSubmit}>
        <Input
          id="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <br />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <br />
        <Button type="submit">Login</Button>

        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;
