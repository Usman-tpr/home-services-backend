const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    cpassword:{
        type:String
    },
})

module.exports = mongoose.model("HomeUser" , userSchema)