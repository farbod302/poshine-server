
const jwt = require("jsonwebtoken")
const verfy_token = (token) => {
    try {
        let user = jwt.verify(token,process.env.JWT)
        return user
    }
    catch {
        return null
    }
}


const reject = (res, msg) => {

    res.json({
        status: false,
        msg
    })
}



module.exports = { verfy_token ,reject}