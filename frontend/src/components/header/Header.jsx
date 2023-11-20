import React from "react";
import "./header.css";
import { Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <div className="headerContainer">
      <Heading
        size="3xl"
        style={{
          fontFamily: "monospace",
          fontWeight: "lighter",
          color: "#2b2b2b",
        }}
      >
        Logs Query Interface
      </Heading>
    </div>
  );
};

export default Header;
