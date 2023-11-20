import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Move this import statement to the top
import { useMyContext } from "../../context/MyProvider";
import "./signup.css";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const { user } = useMyContext();
  const navigate = useNavigate();

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username,
        role,
        password,
      };
      const response = await fetch("http://localhost:3000/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Please check your Inputs");
      }
      navigate("/login");
    } catch (err) {
      console.log("Error : ", err.message);
    }
  };

  return (
    <div className="submitContainer">
      <form onSubmit={submitForm}>
        <p
          style={{
            fontSize: "3em",
          }}
        >
          Signup
        </p>
        <Input
          id="username"
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <Input
          id="role"
          type="text"
          placeholder="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <Input
          id="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <Button type="submit">Signup</Button>
        <p>
          Already a member?{" "}
          <a href="/login" style={{ color: "blue" }}>
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default Signup;
