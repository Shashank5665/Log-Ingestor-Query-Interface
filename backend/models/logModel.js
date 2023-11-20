const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    required: true,
    enum: ["error", "warning", "info"],
    index: true,
  },
  message: {
    type: String,
    required: true,
    index: "text",
  },
  resourceId: {
    type: String,
    required: true,
    index: true,
  },
  timestamp: {
    type: Date,
    required: true,
    index: true,
  },
  traceId: {
    type: String,
    required: true,
  },
  spanId: {
    type: String,
    required: true,
  },
  commit: {
    type: String,
    required: true,
  },
  metadata: {
    parentResourceId: {
      type: String,
    },
  },
});

logSchema.index({ timestamp: 1, level: 1 });

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
