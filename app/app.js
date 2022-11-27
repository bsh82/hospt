const express = require("express");
const app = express();

const PORT = process.env.port || 80;

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");
app.use(express.static(`${__dirname}/src/public`));

//미들웨어
app.use("/",home); 

module.exports = app;


