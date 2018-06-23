const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes/routes');

// const path = require('path');
const mongoose = require('mongoose');
// const routes = require("./src/routes/route");
const config = require('./src/api/config');
// const static = require('./src/docs/static');
// var multer = require('multer');

const app = express();

const port = process.env.PORT || 8000;
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.dbUrl);
// config.user = "testUser";

app.listen(port, () => {
    // static(app);
    routes(app);
    // console.log(__dirname);
    // app.use(express.static(__dirname + '/src/web'))
    // app.get('/', (req, res) => {
    //     res.sendFile(path.join(__dirname + '/src/web/index.html'));
    // });

    console.log('We are live on ' + port);
});