const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    category:{
        type:String
    },
    desc:{
        type:String
    },
    price:{
        type:String
    },
    workingHours:{
        type:String
    },
    phone:{
        type:String
    },
    payementNo:{
        type:String
    },
    admin:{
        type:String
    }
})

module.exports = mongoose.model("HomeService" , userSchema)