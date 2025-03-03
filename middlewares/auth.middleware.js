const userModel = require("../models/user.model");
const bcrypt    = require("bcrypt");
const jwt       = require("jsonwebtoken");


authUser = async (req , res , next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1] ;

    const isBlackListed = await userModel.findOne({token:token});
    console.log(isBlackListed);

    if(isBlackListed){
        return res.status(401).json({
            message: "unauthorized"
        })
    }

    if(!token){
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    try{

        const decoded = jwt.verify(token , process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id);
        req.user = user;
        next();
    }
    catch(err){
        return res.status(401).json({
            message: "Invalid token"
        })
    }
}

module.exports = {authUser};