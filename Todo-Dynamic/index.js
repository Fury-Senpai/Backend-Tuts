const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');


app.set('view engine' , 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , 'public')));

// Get Route
app.get('/' , (req,res)=>{
    fs.readdir('./files',(err,files)=>{
        if (err) return res.status(500).send("Failed to read");
        res.render('index',{files:files});
    })
});

app.get('/files/:filename',(req,res)=>{
    fs.readFile(`./files/${req.params.filename}` , 'utf-8' , (err,filedata)=>{
        if(err) return res.status(500).send("Fail to read");
        res.render('show',{filename:req.params.filename , filedata:filedata});
        
    });
});

app.get('/edit/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, 'utf-8', (err, filedata) => {
        if (err) return res.status(500).send("Fail to read");

        const lines = filedata.split('\n');
        const desc = lines[0] || '';
        const date = lines[1] || '';

        res.render('edit', {
            filename: req.params.filename,
            taskDesc: desc,
            taskDate: date
        });
    });
});

// })
// Post Route
app.post('/create' , (req,res)=>{
    const fileName = `${req.body.taskName}.txt`;
    const fileContent = `${req.body.taskDetail}\n${req.body.taskDate}`;
    const filePath = path.join(__dirname , 'files' , fileName);
    fs.writeFile(filePath , fileContent , (err)=>{
        if (err)  return err.status(500).send("Failed to write");
        res.redirect('/');
    })
})
app.listen(3000);