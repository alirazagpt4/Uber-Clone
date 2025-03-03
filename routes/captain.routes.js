const express = require("express");
const router  = express.Router();
const {body}  = require('express-validator');
const captainController = require("../controllers/captain.controller");


router.post('/register' , [
    body('email')
       .isEmail()
       .withMessage('Invalid Email'),
    body('fullname.firstname')
       .isLength({min:3})
       .withMessage('First name must be at least 3 characters.'),
    body('password')
       .isLength({min:3})
       .withMessage('Password should be at least 6 characters.'),
    body('vehicle.color').isLength({min:3}).withMessage('Color must be atleast 3 characters.'),
    body('vehicle.plate').isLength({min:3}).withMessage("plate at least 3 characters."),
    body('vehicle.capacity').isLength({min:1}).withMessage("capacity must be atleast 1"),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage("Invalid vehicle type.")
],
captainController.registerCaptain)

module.exports = router;