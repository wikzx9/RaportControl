const express = require("express")
const verifyJWT = require('./api/middleware/verifyJWT')
const cors = require('cors');
const raportRoutes = require("./api/routes/raports")
const userRoutes = require("./api/routes/users")
const authRoutes = require("./api/routes/auth")
const cookieParser = require('cookie-parser');
const corsOptions = require('./api/config/corsOptions');
const cridentials = require('./api/middleware/credenctials');
const morgan = require("morgan")
const fs = require("fs");
const path = require("path");
const rfs = require("rotating-file-stream");
const logDirectory = path.join("./api/", "log");


const app = express()

require('dotenv').config()

app.use(cridentials);

const bodyParser = require("body-parser")
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.connect(`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.tsgn3ro.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
.then(()=>{
    console.log('App is connected to database')
})
.catch((error)=>{
    console.log(error)
})

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream("access.log", {
    interval: "1d", 
    path: logDirectory,
  });


app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());


app.use(cors(corsOptions));

  app.use(
    morgan("combined", {
      stream: accessLogStream,
    })
  );



app.use("/raport", raportRoutes)
app.use("/users", userRoutes)
app.use("/auth", authRoutes)


module.exports =app