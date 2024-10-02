const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {

        
        const newUser = await User(req.body);
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );
      console.log(newUser)
        res.send({
            success: true,
            message: "Added User",
            body: newUser,
            token:token
        })
    } catch (error) {
        res.send({
            success: false,
            message: "error while creating user" + error,
            body: null
        })
    }
}
const login = async (req, res) => {
    try {
        const isExistUser = await User.find({
            email: req.body.email
        });

        if (!isExistUser) {
            return res.send({
                success: false,
                message: "Please Create Your Account!",
                body: null
            })
        }

        if (isExistUser[0].password != req.body.password) {
            return res.send({
                success: false,
                message: "Please Correct Your Password",
                body: null
            })
        }
        if (isExistUser[0].password == req.body.password) {
            return res.send({
                success: true,
                message: "Login User Successfully!",
                body: isExistUser
            })
        }



    } catch (error) {
        res.send({
            success: false,
            message: "error while login user" + error,
            body: null
        })
    }
}

const getUserByToken = async ( req , res ) =>{
    try {
         console.log('the id')
        const user = await User.findById(req.user.userId);
     console.log(user)
        res.send({
            success:true,
            message:"Retrieved Successfully",
            body:user
        })
    } catch (error) {
        res.send({
            success:false,
            message:"error"+error,
            body:null
        })
    }
}

module.exports = {
    signup, login , getUserByToken
}