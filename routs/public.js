const express = require('express')
const router = express.Router()

const accesses = require("../accesses.json")

router.get("/accesses_list", (req, res) => {
    let full_list=[]
    accesses.forEach(e=>{
        e.accesses.forEach(d=>{full_list.push(d)})
    })
    res.json({ accesses:full_list })
})




module.exports = router