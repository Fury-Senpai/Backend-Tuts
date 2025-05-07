const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    fs.readdir('./files',(err,files)=>{
        res.render('index',{files:files});
    })
})
    
app.get('/files' , (req,res)=>{
    fs.readdir('./files',(err,files)=>{
        if (err) throw err;
        res.json(files);
    })
})

app.post('/create' , (req,res)=>{
    const fileName = `${req.body.title}`
    const pathName = path.join(__dirname , 'files' , fileName);
    const fileContent = `${req.body.title}\n${req.body.details}`;

    fs.writeFile(fileName , fileContent , (err)=>{
        if(err) throw err;
        res.redirect('/')
    })
})

app.listen(3000);