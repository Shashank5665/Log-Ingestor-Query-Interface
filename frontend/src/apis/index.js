import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

const getLogs = async (filterAttributes) =>
  API.get("/logs", {
    params: filterAttributes,
  });
const createLog = (newLog) => API.post("/logs", newLog);
const deleteAllLogs = () => API.delete("/logs");

export { getLogs, createLog, deleteAllLogs };
