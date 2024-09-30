const express = require("express");
const route = express.Router();
const { signup , login , getUserById } = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

route.post("/signup" , signup);
route.post("/login" , login);
route.get("/" ,authMiddleware, getUserById);



module.exports = route