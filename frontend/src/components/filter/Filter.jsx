import React, { useEffect, useState } from "react";
import { Input, Select, Button } from "@chakra-ui/react";
import "./filter.css";
import { useMyContext } from "../../context/MyProvider";
const { getLogs } = require("../../apis/index");

const Filter = () => {
  const {
    level,
    setLevel,
    setResourceId,
    setTimestampFrom,
    timestampFrom,
    setTimestampTo,
    timestampTo,
    setTimestamp,
    setTraceId,
    setSpanId,
    setCommit,
    setParentResourceId,
  } = useMyContext();

  const formattedTimestamp = (inputTimestamp) => {
    let date;
    if (inputTimestamp) {
      date = new Date(inputTimestamp);
      return date.toISOString();
    }
  };

  useEffect(() => {
    if (timestampFrom && timestampTo) {
      setTimestamp(`${timestampFrom},${timestampTo}`);
    }
  }, [timestampFrom, timestampTo]);

  return (
    <div className="filterContainer">
      <div className="timestampContainer">
        <div className="timer">
          <span>From : </span>
          <Input
            type="datetime-local"
            placeholder="From"
            onChange={(e) =>
              setTimestampFrom(formattedTimestamp(e.target.value))
            }
            width="220px"
            style={{ boxShadow: "0px 0px 1px 1px grey" }}
          />
        </div>
        <div className="timer">
          <span>To : </span>
          <Input
            type="datetime-local"
            placeholder="To"
            onChange={(e) => setTimestampTo(formattedTimestamp(e.target.value))}
            width="220px"
            style={{ boxShadow: "0px 0px 1px 1px grey" }}
          />
        </div>
      </div>
      <Select
        id="selectLevel"
        placeholder="Select level"
        style={{ boxShadow: "0px 0px 1px 1px grey" }}
        onChange={(e) => setLevel(e.target.value)}
      >
        <option value="error">error</option>
        <option value="warning">warning</option>
        <option value="info">info</option>
      </Select>

      <Input
        type="text"
        placeholder="Resource Id"
        style={{ boxShadow: "0px 0px 1px 1px grey" }}
        onChange={(e) => setResourceId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Trace Id"
        style={{ boxShadow: "0px 0px 1px 1px grey" }}
        onChange={(e) => setTraceId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Span Id"
        style={{ boxShadow: "0px 0px 1px 1px grey" }}
        onChange={(e) => setSpanId(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Commit"
        style={{ boxShadow: "0px 0px 1px 1px grey" }}
        onChange={(e) => setCommit(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Parent resource Id"
        style={{ boxShadow: "0px 0px 1px 1px grey" }}
        onChange={(e) => setParentResourceId(e.target.value)}
      />
      {/* <Button
        colorScheme="red"
        style={{ boxShadow: "0px 0px 1px 1px grey", width: "100%" }}
      >
        Reset all
      </Button> */}
    </div>
  );
};

export default Filter;
