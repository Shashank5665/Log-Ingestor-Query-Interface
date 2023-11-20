const express = require("express");
const router = express.Router();
const {
  createLog,
  deleteLastLog,
  getAllLogs,
} = require("../controllers/logController");

router.get("/", getAllLogs);
router.post("/", (req, res) => createLog(req, res, req.io));
router.delete("/", deleteLastLog);

module.exports = router;
