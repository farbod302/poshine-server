const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")
const bodyParser = require("body-parser")

require('dotenv').config()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.DB, () => { console.log("connected to db"); })




const admin = require("./routs/admin")
const public = require("./routs/public")
const registion = require("./routs/registion")
const user = require("./routs/user")

app.use("/admin", admin)
app.use("/public", public)
app.use("/registion", registion)
app.use("/user", user)





app.listen("4554", () => { console.log("server run on port 4554"); })