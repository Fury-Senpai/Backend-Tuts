const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , "public")));

app.get('/' , (req , res)=>{
    res.render("index");
})

app.get('/path/files',(req,res)=>{
    fs.readdir('./files',(err , files)=>{
        if(err){
            return res.status(500).json({error:'Unable to fetch files'});
        }
        res.json(files);
    })
});

app.post('/create',(req,res)=>{
    const fileName = `${req.body.title}.txt`;
    const filePath = path.join(__dirname , 'files' , fileName);
    const fileContent = `${req.body.title} ${req.body.details}`;
    fs.writeFile(filePath , fileContent , (err) => {
        if(err) throw err;
        res.redirect("/");
    })
})

app.listen(3000);




