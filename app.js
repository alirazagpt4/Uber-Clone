const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan")
const connectToDB = require("./db/db");
connectToDB();
const userRoutes = require("./routes/user.routes");
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes

app.get("/" , (req , res)=>{
    res.send("Welcome to the Express Server!");
})

app.use("/users" , userRoutes);
 
module.exports = app;