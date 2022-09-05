const express = require('express')
const { verfy_token, reject } = require('../helper')
const router = express.Router()
const f_list = require("../froms.json")


router.post("/user_forms", (req, res) => {
    const { token } = req.headers
    let user = verfy_token(token)
    if (!user) { return reject(res, "شناسه نامعتبر") }
    let forms_list = [ ...f_list ]
    forms_list = forms_list.filter(e => user.access.includes(e.req_acc))
    res.json({ status: true, data: { forms_list } })
})





module.exports = router