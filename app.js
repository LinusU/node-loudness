'use strict';

var express = require('express');
var loudness = require('./index_reduced');
var app = express();

app.get('/set/:value', function(req, res) {
    var value = req.params.value;
    loudness.setVolume(value * 1, function(err) {
        console.error(err);
    });
    res.send('Up volumen:' + value);
});
app.get('/toggle', function(req, res) {
    loudness.toggleMuted(function(err) {
        console.error(err);
    });
});

app.listen(8080, function() {
    console.log('All is loaded');
});
