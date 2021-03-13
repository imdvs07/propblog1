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
mongoose.connect("mongodb+srv://divyansh:dvs123456@cluster0.dvgy0.mongodb.net/PropBlog?retryWrites=true&w=majority" ,
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

const PORT = process.env.PORT || 8080; 
app.listen(PORT, ()=>{
    console.log("Server up and running");
});