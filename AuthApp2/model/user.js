const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/authAPP2')

const userSchema = mongoose.Schema({
    username: String,
    email: {
        type:String,
        unique:true
    },
    password: String
});

module.exports = mongoose.model('user' , userSchema);