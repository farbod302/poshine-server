const express = require('express')
const router = express.Router()

const accesses = require("../accesses.json")

router.get("/accesses_list", (req, res) => {
    res.json({ accesses })
})




module.exports = router