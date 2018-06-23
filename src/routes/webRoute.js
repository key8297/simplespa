const express = require('express');
const path = require('path');

const webRoute = (app) => {
    app.use(express.static(__dirname + './../web'))
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname + './../web/index.html'));
    });
}

module.exports = webRoute; 