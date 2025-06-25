const express = require('express')
const router = express.Router();
router.get('/test',(req,res)=>{
    // res.send("hello from router")
    res.render('register')
})

module.exports = router;