const express = require("express");
const route = express.Router();
const { signup , login , getUserByToken } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

route.post("/signup" , signup);
route.post("/login" , login);
route.get("/byToken" ,authMiddleware, getUserByToken);



module.exports = route