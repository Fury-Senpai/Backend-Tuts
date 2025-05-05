const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/path/file', (req, res) => {
    fs.readdir('./files', (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error reading files');
            return;
        }
        res.json(files);
    });
});

app.post('/create', (req, res) => {
    const { jsname, jsDate } = req.body;
    const fileName = `${jsname}.txt`;
    const filePath = path.join(__dirname, 'files', fileName);
    const fileContent = `${jsname}\n${jsDate}`;
    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Failed to create file');
        }
        res.redirect('/');
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
