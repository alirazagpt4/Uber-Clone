const express = require("express");
const router  = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.post("/register" , [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('fullname.firstname')
        .isLength({min:3})
        .withMessage('first name must be atleast 3 character'),
    body('password')
        .isLength({min:3})
        .withMessage('password should be atleast 6 characters')
] , userController.registerUser);

router.post("/login" , [
    body('email')
        .isEmail()
        .withMessage('Invalid Email'),
    body('password')
        .isLength({min:3})
        .withMessage('password should be atleast 6 characters')
], userController.login)


router.get('/profile' ,authMiddleware.authUser , userController.getUserProfile)
router.get('/logout' ,authMiddleware.authUser , userController.logout)

module.exports = router;