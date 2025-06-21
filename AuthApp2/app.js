const express = require('express');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const model = require('./model/user');
const app = express();

app.use(express.json());
app.use(cookieParser());
/* =================================> GET ROUTE <================================= */

app.post('/',(req,res)=>{
    app.send('WELCOME');
})

/* =================================> POST ROUTE <================================= */
app.post('/signup',async (req,res)=>{
    let {username , email , password} = req.body;

    const saltRounds = 10;
    const hassedPassword = await bcrypt.hash(password , saltRounds);
    const createUser = await model.create({
        username,
        email,
        password:hassedPassword
    });

    
    return res.status(201).json({
        message:'User created successfully',
        success: true,
        data: {createUser}
    })
});


app.post('/login',async (req,res)=>{
    let {email,password} = req.body;
    const findUser = await model.findOne({email:email});
    if(!findUser){
        return res.status(404).json({
            message:'User or Password is wrong',
            success:false,
            data:null
        });
    }

    const isMatch = await bcrypt.compare(password , findUser.password);
    if(!isMatch){
        return res.status(404).json({
            message:'User or Password is wrong',
            success:false,
            data:null
        });
    }

    const secret_key = 'akldnkldnad283u1';
    const token = jwt.sign({
        userId:findUser._id,
        email:findUser.email
    } , secret_key);

    res.cookie('token' , token);

    return res.status(200).json({
        message:'user login successfull',
        data:{email},
        success:true
    })

})
app.listen(3000);