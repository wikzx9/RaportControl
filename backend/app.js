const express =require("express")

const cors = require('cors');

const app = express()
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.tsgn3ro.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
.then(()=>{
    console.log('App is connected to database')
})
.catch((error)=>{
    console.log(error)
})

const morgan = require("morgan")
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");

const logDirectory = path.join("./api/", "log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", 
    path: logDirectory,
  });

  const allowedOrigins = ['http://localhost:5173'];
  app.use(cors({
    origin: function (origin, callback) {
      
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }));

  app.use(
    morgan("combined", {
      stream: accessLogStream,
    })
  );

const bodyParser = require("body-parser")
app.use(bodyParser.json())

const raportRoutes = require("./api/routes/raports")
const userRoutes = require("./api/routes/users")
const checkAuth = require("./api/middleware/checkAuth")

app.use("/raport", raportRoutes)
app.use("/users", userRoutes)


module.exports =app