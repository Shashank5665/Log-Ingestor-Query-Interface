// Search.js
import React, { useState } from "react";
import { Input, Button } from "@chakra-ui/react";
import "./search.css";
import { useMyContext } from "../../context/MyProvider";
const { getLogs } = require("../../apis/index");

const Search = () => {
  const {
    level,
    message,
    setMessage,
    resourceId,
    timestamp,
    traceId,
    spanId,
    commit,
    parentResourceId,
    setLogData,
  } = useMyContext();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const filterAttributes = {};
      if (level) filterAttributes.level = level;
      if (message) filterAttributes.message = message;
      if (resourceId) filterAttributes.resourceId = resourceId;
      if (timestamp) filterAttributes.timestamp = timestamp;
      if (traceId) filterAttributes.traceId = traceId;
      if (spanId) filterAttributes.spanId = spanId;
      if (commit) filterAttributes.commit = commit;
      if (parentResourceId)
        filterAttributes.parentResourceId = parentResourceId;

      const response = await getLogs(filterAttributes);
      setLogData(response.data.logs);
    } catch (error) {
      console.error("Error getting logs:", error);
    }
  };

  return (
    <div className="searchContainer">
      <Input
        placeholder="search messages"
        value={message}
        htmlSize={75}
        style={{
          borderRadius: "10px 0px 0px 10px",
          boxShadow: "0px 0px 1px 1px grey",
        }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button
        colorScheme="blue"
        variant="solid"
        style={{
          width: "150px",
          borderRadius: "0px 10px 10px 0px",
          boxShadow: "0px 0px 1px 1px grey",
        }}
        onClick={handleSearch}
      >
        Search
      </Button>
    </div>
  );
};

export default Search;
