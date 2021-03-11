const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

//IMPORT ROUTES
const authRoute = require('./routes/auth');
const postRoute = require("./routes/posts");

//DATABASE CONNECT
mongoose.connect(process.env.DB_CONNECT ,
{ useNewUrlParser: true, useUnifiedTopology: true }  , ()=>{ 
    console.log("Connected to Database PropBlog");
});

//COOKIE PARSER
app.use(cookieParser());

const issue2options = {
    origin: "http://localhost:3000",
    methods: ['GET', 'PUT', 'POST'],
    credentials: true,
  };

//MIDDLEWARE
app.use(express.json()); 
app.use(cors(issue2options));

//ROUTE MIDDLEWARE
app.use("/", authRoute); 
app.use("/", postRoute);


app.listen(8080, ()=>{
    console.log("Server up and running");
});