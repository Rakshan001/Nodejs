const mongoose= require('mongoose');

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:Number
})

const userModal = mongoose.model('user',userSchema)

module.exports=userModal