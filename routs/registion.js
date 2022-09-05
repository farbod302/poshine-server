const express = require('express')
const User = require('../db/user')
const router = express.Router()
const sha256 = require("sha256")
const { reject } = require('../helper')
const jwt = require("jsonwebtoken")
router.post("/log_in",async (req, res) => {
    const { userName, password } = req.body
    let user = await User.findOne({ id: userName, password: sha256(password) })
    if (!user) {return reject(res,"نام کاربری یا رمز عبور اشتباه است") }
    const { idenity, access } = user
    const { name, lastName } = idenity
    const payload = {
        fullName: `${name} ${lastName}`,
        access
    }
    let token = jwt.sign(payload, process.env.JWT)
    res.json({ status: true, msg: "خوش آمدید!", data: { token } })
})




module.exports = router