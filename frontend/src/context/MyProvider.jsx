import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
const MyContext = createContext();
const { getLogs } = require("../apis/index");

const MyProvider = ({ children }) => {
  const [level, setLevel] = useState("");
  const [message, setMessage] = useState("");
  const [resourceId, setResourceId] = useState("");
  const [timestampFrom, setTimestampFrom] = useState("");
  const [timestampTo, setTimestampTo] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [traceId, setTraceId] = useState("");
  const [spanId, setSpanId] = useState("");
  const [commit, setCommit] = useState("");
  const [parentResourceId, setParentResourceId] = useState("");
  const [logData, setLogData] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const getLogsData = async () => {
      try {
        const response = await getLogs();
        setLogData(response.data.logs);
      } catch (error) {
        console.error("Error getting logs:", error);
      }
    };
    getLogsData();
  }, []);

  return (
    <MyContext.Provider
      value={{
        level,
        setLevel,
        message,
        setMessage,
        resourceId,
        setResourceId,
        timestampFrom,
        setTimestampFrom,
        timestampTo,
        setTimestampTo,
        timestamp,
        setTimestamp,
        traceId,
        setTraceId,
        spanId,
        setSpanId,
        commit,
        setCommit,
        parentResourceId,
        setParentResourceId,
        logData,
        setLogData,
        user,
        setUser,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => useContext(MyContext);

export default MyProvider;
