const express = require("express");
const route = express.Router();
const authMiddleware = require("../middlewares/auth");
const { pollCreation, getServices, getServicesByToken, serviceDeletion } = require("../controllers/servicesController");

route.post("/add" ,authMiddleware, pollCreation);
route.get("/getAll" , getServices);
route.get("/getMy" ,authMiddleware, getServicesByToken);
route.delete("/delete/:id" , serviceDeletion);




module.exports = route