const express = require('express')
const router = express.Router()
const sha256 = require("sha256")
const User = require('../db/user')
const { verfy_token, reject } = require('../helper')

router.post("/add_user", async (req, res) => {
    let req_acc = 0
    const { name, lastName, phone, acc, id, password } = req.body
    const { token } = req.headers
    let user = verfy_token(token)
    if (!user) { return reject(res, "شناسه نامعتبر") }
    const { access } = user
    if (!access.includes(req_acc)) { return res.json({ status: false, msg: "شما دسترسی لازم را ندارید" }) }
    let is_exist=await User.findOne({id:id})
    if(is_exist){return reject(res,"نام کاربری تکراری است")}
    let new_user = { idenity: { name, lastName, phone }, access: acc, password: sha256(password), id }
    new User(new_user).save()
    res.json({ status: true, msg: "کاربر ثبت شد" })

})

router.post("/edit_user", async (req, res) => {
    let req_acc = 0
    const { name, lastName, phone, acc, active, id, password } = req.body
    console.log(acc);
    const { token } = req.headers
    let user = verfy_token(token)
    if (!user) { return reject(res, "شناسه نامعتبر") }

    const { access } = user
    if (!access.includes(req_acc)) { return res.json({ status: false, msg: "شما دسترسی لازم را ندارید" }) }
    let query = {
        idenity: { name, lastName, phone },
        access: acc, active: active, 
    }
    if(password){
        query.password=sha256(password)
    }
    await User.findOneAndUpdate({ id: id },
        {
            $set:
            query
        })

    res.json({ status: true, msg: "کاربر ویرایش شد" })

})





module.exports = router