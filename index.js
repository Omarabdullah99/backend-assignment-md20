const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser= require('cookie-parser');
const UserRouter = require("./routes/UserRouter");
const ProfileRouter = require("./routes/ProfileRouter");



const app = express();

//middleware
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(cookieParser()); 


//router setup
app.use('/api/v1/user', UserRouter)
app.use('/api/v1/profile', ProfileRouter)

//Root-router setup
app.get("/hello", (req, res) => {
  res.send("hello e-commerce-project");
});



//mongodb atlas setup

const MONGODB_URL =
  "mongodb+srv://khalidabdullah1147:hUm6Dh2kJb4IW7eS@ostad-ass-4-mo-20.xcc66.mongodb.net/?retryWrites=true&w=majority&appName=ostad-ass-4-mo-20";

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(MONGODB_URL);
  console.log("database connected");
}

app.listen(5000,()=>{
    console.log('port is runing 5000')
})
