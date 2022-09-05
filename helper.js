
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



const check_permission=(accesses,groupe,req_acc)=>{
    let s_acc = accesses.findIndex(e => e.groupe === groupe)
    if (!s_acc || !access[s_acc].includes(req_acc)) { return false }
    return true
}

module.exports = { verfy_token ,reject,check_permission}