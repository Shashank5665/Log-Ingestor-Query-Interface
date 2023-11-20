const express = require("express");
const { protect } = require("../middlewares/authUser.js");
const router = express.Router();
const {
  signupUser,
  loginUser,
  logoutUser,
  deleteAllUsers,
} = require("../controllers/userController");

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.delete("/delete", deleteAllUsers);

module.exports = router;
