const express = require('express')
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const path = require('path');
const model = require('./model/user');
const app = express();

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));


//==============================GET ROUTE===================================
app.get('/',(req,res)=>{
    res.render('signup');
})
//for reading users in database
app.get('/read',async (req,res)=>{
    const readUser = await model.find({});
    res.send({readUser : readUser});
    
})
//get signup
app.get('/signup',async(req,res)=>{
    res.render('signup');
})
//get login
app.get('/login',async(req,res)=>{
    res.render('login');
})

app.get('/dashboard',(req,res)=>{  
    res.render('dashboard')
})

app.get('/logout',(req,res)=>{
    res.cookie("token" , "");     
    res.render('signup')
})
//================post route===========================
app.post('/signup',async(req,res)=>{
    const {username , email , password , age} = req.body;
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password , saltRounds);
    const createUser = await model.create({
        username : username,
        email : email,
        password : hashedPassword,
        age : age
    });

    res.redirect('/');
    console.log("User Created");
    return res.status(201).json({
        message:'user created successfuly',
        data:{createUser},
        success:true
    })
    
    
})

app.post('/dashboard', async (req, res) => {    
    const { email, password } = req.body;

    const findUser = await model.findOne({ email });
    if (!findUser) {
        return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid password" });
    }

    const secretkey = '$k.df12jdkA$sS$';
    const token = jwt.sign({ userId: findUser._id }, secretkey);

    const cookieData = res.cookie("token", token);
    console.log(cookieData);

    
    res.redirect('/dashboard'); 
});



app.listen(3000);