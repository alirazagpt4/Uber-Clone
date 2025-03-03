const captainModel = require("../models/captain.model");

// Create Captain
module.exports.createCaptain = async ({
    firstname , lastname , email , password , color , plate , capacity , vehicleType
}) =>{ 
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('All the fields are require')
    }

    const captain = await captainModel.create({
        fullname:{
            firstname,
            lastname
        },
        email,
        password,
        vehicle : {
            color,
            plate,
            capacity,
            vehicleType
        }
    });

    return captain;
 
}