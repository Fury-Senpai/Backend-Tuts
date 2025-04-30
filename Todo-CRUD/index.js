const { urlencoded } = require('body-parser');
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname , "public")));

app.get('/' , (res,req) => {
    console.log(files);
    res.render(index,{files:files});
})


let todos = [];
app.post('/add-todo',(req,res)=>{
    const{name,date} = req.body;

    const todo = {name,body};
    todos.push(todo);

    const fileName = `${name}-${date}.txt`;
    const filePath = path.join(__dirname , 'files',fileName);


    //Save content inside file

    const fileContent = `Date: ${date}\nTask: ${name}`;

    fs.writeFile(filePath , fileContent , (err) =>{
        if(err){
            console.error('Error saving file',err);
            return res.status(500).send('Error saving todo');
        }
    });
    res.json(todos);
})

app.listen(3000);