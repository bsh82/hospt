const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config();//환경변수 관리

const app = express();
const PORT = process.env.port || 3000;//포팅

//라우팅
const home = require("./src/routes/home");

//앱 세팅
app.set("views", "./src/views");
app.set("view engine", "ejs");

//미들웨어
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());

//URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({extended: true}));

app.use("/",home); 

module.exports = app;


