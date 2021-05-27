const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const app = express();
app.use(cookieParser());

dotenv.config({path:"./config.env"});
require("./db/conn");

app.use(express.json());


//const User = require("./model/userSchema");
//link router file 
app.use(require("./router/auth"));


const PORT = process.env.PORT;







// app.get("/about",(req,res) =>{
//     console.log("hello my about middleware");
//     res.send("hello about from the server")
// });

// app.get("/contact",(req,res) =>{
//     res.send("hello contact from the server")
// });

app.get("/signin",(req,res) =>{
    res.send("hello login from the server")
});

app.get("/signup",(req,res) =>{
    res.send("hello registration from the server")
});

app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
})
