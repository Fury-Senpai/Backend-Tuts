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
    
app.get('/files/:filename' , (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8",(err,filedata)=>{
        if (err) throw err;
        res.render('show' , {filename: req.params.filename , filedata: filedata});
    })
})

app.get('/edit/:filename' , (req,res)=>{
    fs.readFile(`./files/${req.params.filename}`, "utf-8",(err,filedata)=>{
        if (err) throw err;
        res.render('edit' , {filename: req.params.filename , filedata: filedata});
    })
})

app.post('/create' , (req,res)=>{
    const fileName = `${req.body.title}.txt`
    const pathName = path.join(__dirname , 'files' , fileName);
    const fileContent = `${req.body.title}\n${req.body.details}`;

    fs.writeFile(pathName , fileContent , (err)=>{
        if(err) throw err;
        res.redirect('/')
    })
})

app.post('/edit' , (req,res)=>{
    const oldTitle = req.body.oldTitle.trim() + '.txt';
    const newTitle = req.body.newTitle.trim() + '.txt';
    const newDetail = req.body.newDetail.trim(); 

    const oldPath = path.join(__dirname , 'files' , oldTitle);
    const newPath = path.join(__dirname , 'files' , newTitle);
    const newFileContent = `${newDetail}`

    const renameAndWrite = () => {
        fs.writeFile(newPath, newFileContent, (err) => {
            if (err) return res.status(500).send("Failed to write content");
            res.redirect('/');
        });
    };
    
    if (newTitle !== oldTitle) {
        fs.rename(oldPath, newPath, (err) => {
            if (err) return res.status(500).send("Rename failed");
            renameAndWrite();
        });
    } else {
        // Title not changed, just overwrite
        fs.writeFile(oldPath, newFileContent, (err) => {
            if (err) return res.status(500).send("Write failed");
            res.redirect('/');
        });
    }
});
    
app.listen(3000);