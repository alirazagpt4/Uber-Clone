const captainModel = require("../models/captain.model");
const captainService = require("../services/captain.services");
const {validationResult} = require("express-validator");


registerCaptain = async (req , res , next ) =>{
       
    const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }

        const {fullname , email , password,vehicle} = req.body;

        const isCaptainExists = await captainModel.findOne({email});

        if(isCaptainExists){
            return res.status(400).json({error: 'Captain already exists with this email'});
        }
        
        const hashedPassword = await captainModel.hashPassword(password);


        const captain = await captainService.createCaptain({
                firstname:fullname.firstname,
                lastname: fullname.lastname,
                email,
                password:hashedPassword,
                color:vehicle.color,
                plate:vehicle.plate,
                capacity:vehicle.capacity,
                vehicleType:vehicle.vehicleType
        });

        const token = captain.generateAuthToken();

        return res.status(201).json({
            message: "Captain registered successfully",
            token,
            captain
        })
    
}

loginCaptain = async (req , res , next)=>{

}


module.exports = {registerCaptain , loginCaptain};

