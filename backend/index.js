const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = 3000;
const connectDB = require("./config/db");
const logRoutes = require("./routes/logRoute");
const userRoutes = require("./routes/userRoute");
const initializeSocket = require("./utils/socketioUtil");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Dyte's server is running on port ${PORT}...`);
});

//--------------------------socket.io--------------------------//

const io = initializeSocket(server);

app.use(
  "/logs",
  (req, res, next) => {
    req.io = io;
    next();
  },
  logRoutes
);

app.use("/users", userRoutes);
