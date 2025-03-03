const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const captainSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,"First name should be 3 character."],
        },
        lastname:{
            type:String,
            minlength:[3,"Last name should be 3 character."],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        
    },
    password:{
        type:String,
        required:true,
        select:false,
        minlength:[8,"Password should be at least 8 characters long."],
      
    },
    socketId:{
        type:String
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:'inactive'
    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minlength:[3,"Color should be 3 characters long."]
        },
        plate:{
            type:String,
            required:true,
            minlength:[6,"Plate should be 6 characters long."]
        },
        capacity:{
            type:Number,
            required:true,
            min:1,
            max:5
        },
        vehicleType:{
            type:String,
            required:true,
            enum:["car","bike","auto"]
        }
    },
    location:{
        lat:{
            type:Number
        },
        long:{
            type:Number
        }
    }
});

captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET,{expiresIn:'24h'}); 
    return token;
}

captainSchema.methods.comparedPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password,10);
}

const captainModel = mongoose.model('captain' , captainSchema);

module.exports = captainModel;