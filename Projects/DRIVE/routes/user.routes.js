const express = require('express')
const router = express.Router();
const {body,ValidationResult, validationResult} = require('express-validator')



router.get('/register',(req,res)=>{
    res.render('register')
})

router.post('/register',
    body('name').trim(),
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:4}),


    (req,res)=>{
    // res.send("hello from router")
    const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                error:errors.array(),
                message:"Invalid Data"
            })
        }


    console.log(errors)
    console.log(req.body)
    res.send(errors)
})

module.exports = router;