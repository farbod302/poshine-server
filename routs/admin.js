const express = require('express')
const router = express.Router()
const sha256 = require("sha256")
const User = require('../db/user')
const { verfy_token, reject, check_permission } = require('../helper')

router.post("/add_user",async (req, res) => {
    let req_acc = 0
    let req_group = "admin"
    const { name, lastName, phone, acc,id } = req.body
    const { token } = req.headers
    let user = verfy_token(token)
    const { access } = user
    let has_acc = check_permission(access, req_group, req_acc)
    if (!has_acc) { return res.json({ status: false, msg: "شما دسترسی لازم را ندارید" }) }
    let new_user = { idenity: { name, lastName, phone }, access:acc, password: sha256(phone),id }
    new User(new_user).save()
    res.json({ status: true, msg: "کاربر ثبت شد" })

})

router.post("/edit_user",async (req, res) => {
    let req_acc = 0
    let req_group = "admin"
    const { name, lastName, phone, acc, active, _id, password } = req.body
    const { token } = req.header
    let user = verfy_token(token)
    const { access } = user
    let has_acc = check_permission(access, req_group, req_acc)
    if (!has_acc) { return res.json({ status: false, msg: "شما دسترسی لازم را ندارید" }) }
    await User.findByIdAndUpdate(_id,
        {
            $set:
            {
                idenity: { name, lastName, phone },
                acc: acc, active: active, password: sha256(password)
            }
        })

    res.json({ status: true, msg: "کاربر ویرایش شد" })

})





module.exports = router