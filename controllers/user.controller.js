const userModel = require("../models/user.model");
const userService = require("../services/user.services")
const {validationResult} = require("express-validator");
const blacklisttoken = require('../models/blacklisttoken.model');
registerUser = async (req , res , next) =>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
   }

   const { fullname , lastname , email , password } = req.body;

   const hashedPassword = await userModel.hashPassword(password);

   const user = await userService.create({
        firstname:fullname.firstname,
        lastname: fullname.lastname,
        email,
        password:hashedPassword
   })

   const token = user.generateAuthToken();

   res.status(201).json({token , user});
}


login = async (req , res , next) =>{
   const errors = validationResult(req);
   if(!errors.isEmpty()){
      return res.status(400).json({errors: errors.array()});
   }
   
   const { email, password } = req.body;

   const user = await userModel.findOne({email}).select('+password');

   if(!user){
      return res.status(404).json({error: 'User not found'});
   }

   const isMatch = await user.comparedPassword(password);


   if(!isMatch){
      return res.status(401).json({error: 'Invalid credentials'});
   }

   const token = user.generateAuthToken();
   res.cookie('token', token);
    
   res.status(200).json({ token , user});
}


getUserProfile = async (req , res)=>{
    res.json({
      message:"user verfied",
      user:req.user});
}


logout = async(req,res)=>{
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    const blacklist = await blacklisttoken.create({token});
   

    res.json({message:"Logged out"});
}


module.exports = {registerUser , login , getUserProfile,logout}