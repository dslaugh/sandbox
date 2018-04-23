const fs = require('fs');
const express = require('express');
const echarts = require('echarts');

const app = express();
const PORT = 8000;

app.engine('ntl', (filePath, options, callback) => {
    fs.readFile(filePath, (err, tmpl) => {
        if (err) {
            return callback(err);
        }
        const rendered = tmpl.toString();
        return callback(null, rendered);
    });
});

app.set('views', './views');
app.set('view engine', 'ntl');


app.get('/', (req, res) => {
    res.render('index', {});
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});