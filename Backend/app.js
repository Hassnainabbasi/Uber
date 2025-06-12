const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDb();

app.use('/users',userRoutes)
app.get("/", (req, res) => {
  res.send("Hello World");
});

module.exports = app;
