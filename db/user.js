const mongoose = require("mongoose")



const user = mongoose.Schema({

    idenity: Object,
    id: String,
    access: Array,
    active: { type: Boolean, default: true },
    password: String,

})


module.exports = mongoose.model("User", user)