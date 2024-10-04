const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
    serviceId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"HomeService"
    },
    amount:{
        type:String
    }
})

module.exports = mongoose.model("Booking" , bookingSchema)