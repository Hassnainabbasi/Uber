const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDb = require("./db/db");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const captainRoutes = require("./routes/captainRoutes")
const mapsRoutes = require("./routes/mapRoutes");
const rideRoutes = require("./routes/rideRoutes");

app.use(cors());
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectToDb();
app.use('/maps',mapsRoutes)
app.use('/rides',rideRoutes)
app.use('/users',userRoutes)
app.use('/captains',captainRoutes)
app.get("/", (req, res) => {
  res.send("Hello World");
});


module.exports = app;
