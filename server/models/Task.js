const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
    },
    lastName:{
        type:String,
        required:[true,'must provide name'],
        trim:true,
        
    },
    email:{
        type:String,
        require:[true, "must provide email"],
        unique:true,
        
    },
    phoneNumber:{
        type:String,
        require:false,
    },
    password:{
        type:String,
        require:true,
        minlength:8
        
    }
})

module.exports = mongoose.model('Users',TaskSchema)