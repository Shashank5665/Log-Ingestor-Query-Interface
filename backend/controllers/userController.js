const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken.js");

//---------------------------------------------------------------------------------------------------------------------

const signupUser = async (req, res) => {
  try {
    const { username, role, password } = req.body;

    if (!username || !role || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      role,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user.username),
      });
    } else {
      return res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

//----------------------------------------------------------------------------------------------------------------------

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (user && (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: generateToken(user.username),
      });
    } else {
      res.status(401).json("Invalid username or password");
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to login" });
  }
};
//----------------------------------------------------------------------------------------------------------------------

const logoutUser = async (req, res, next) => {
  try {
    localStorage.clear();
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to logout" });
  }
};

//----------------------------------------------------------------------------------------------------------------------

const deleteAllUsers = async (req, res) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: "All users deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete all users" });
  }
};

module.exports = { signupUser, loginUser, logoutUser, deleteAllUsers };
