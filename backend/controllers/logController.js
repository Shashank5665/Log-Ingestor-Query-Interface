const Log = require("../models/logModel");

const createLog = async (req, res, io) => {
  try {
    const {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      metadata,
    } = req.body;

    const logData = {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      metadata,
    };

    const newLog = await Log.create(logData);
    io.emit("newLog", newLog);

    res.status(201).json(newLog);
  } catch (error) {
    console.error("Error creating log:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllLogs = async (req, res) => {
  try {
    const {
      level,
      message,
      resourceId,
      timestamp,
      traceId,
      spanId,
      commit,
      parentResourceId,
    } = req.query;

    const query = {};

    if (level) query.level = level;
    if (message) query.message = { $regex: new RegExp(message), $options: "i" };
    if (resourceId) query.resourceId = resourceId;

    if (timestamp) {
      if (timestamp.includes(",")) {
        const [start, end] = timestamp.split(",");
        start.trim();
        end.trim();
        query.timestamp = { $gte: new Date(start), $lte: new Date(end) };
      } else {
        query.timestamp = new Date(timestamp);
      }
    }

    if (traceId) query.traceId = traceId;
    if (spanId) query.spanId = spanId;
    if (commit) query.commit = commit;
    if (parentResourceId)
      query["metadata.parentResourceId"] = parentResourceId.trim();

    const logs = await Log.find(query);

    const response = {
      count: logs.length,
      logs,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error("Error retrieving logs:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteLastLog = async (req, res) => {
  try {
    const lastLog = await Log.findOneAndDelete().sort({ _id: -1 });
    res.status(200).json(lastLog);
  } catch (err) {
    console.error("Error deleting last log:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createLog,
  deleteLastLog,
  getAllLogs,
};
