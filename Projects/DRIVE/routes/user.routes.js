const express = require('express')
const router = express.Router();
const {body,ValidationResult, validationResult} = require('express-validator')
const userModel = require('../models/user.models')
const bcrypt = require('bcrypt');


router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('name').trim(),
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:4}),


    async        (req,res)=>{
    // res.send("hello from router")
    const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                message:"Invalid Data"
            })
        }

        const {name,email,password, terms} =req.body;

        const hashPassword = await bcrypt.hash(password,10)

        const newUser = await userModel.create({
            name,
            email,
            password:hashPassword,
            termsAccepted: terms == 'agreed',
        })

        res.json(newUser)


    console.log(errors)
    console.log(req.body)
    res.send(errors)
})

module.exports = router;