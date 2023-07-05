require("./Database/DBConnect");
const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 5000;
require("./socket/socket");

const router = require("./routes/routes");
// Enable CORS for all routes

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000, http://192.168.163.99:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(express.json());

app.listen(port, () => {
  console.log("backend connected");
});

app.use(router);
