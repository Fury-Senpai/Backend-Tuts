const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/authApp');

const userSchema = mongoose.Schema({
    username:{
        type:String
    },
    email:{
        type : String,
        unique : String
    },
    password:{
        type:String
    },
    age:{
        type:Number
    }
    
});
module.exports = mongoose.model('user' , userSchema);