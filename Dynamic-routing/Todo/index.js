const express = require('express');
const app = express();
const path = require('path');
const fs = require('path');

app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));

app.get('/' , (req,res)=>{
    re
});

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