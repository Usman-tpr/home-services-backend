const mongoose = require('mongoose');
const express = require("express");
const app = express();
const cors = require("cors")
require("dotenv").config()
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(process.env.PORT , ()=>{
        console.log("Connected the database and the Running port is 5000")
    })
}).catch((err)=>{
     console.log("Error while connecting to database" , err)
})

const userRoutes = require("./routes/userRoute")
const ServiceRoutes = require("./routes/ServicesRoutes")
// const yonRoutes = require("./routes/YesOrNoRoute/YONRoutes")
// const productRoutes = require("./routes/Product Routes/ProductRoutes")
app.use("/user" , userRoutes)
app.use("/services" , ServiceRoutes)
const paymentRoutes = require('./routes/paymentRoutes');

app.use("/payment" , paymentRoutes)
// app.use("/poll" , yonRoutes)
// app.use("/poll" , productRoutes)

