const express =require("express")
const app = express()
require('dotenv').config()

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.tsgn3ro.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
.then(()=>{
    console.log('App is conected to database')
})
.catch((error)=>{
    console.log(error)
})
//logowanie dodać dopisywanie do pliku
const morgan = require("morgan")
const fs = require("fs");
const path = require("path");
const rfs = require("file-stream-rotator");

const logDirectory = path.join("./api/", "log");
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", 
    path: logDirectory,
  });

  app.use(
    morgan("combined", {
      stream: accessLogStream,
    })
  );

const bodyParser = require("body-parser")
app.use(bodyParser.json())

const raportRoutes = require("./api/routes/raports")
const userRoutes = require("./api/routes/users")

// app.use("/raport", raportRoutes)
// app.use("/users", userRoutes)


module.exports =app