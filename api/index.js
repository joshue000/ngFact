'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3800;

mongoose.Promise =  global.Promise;

mongoose.connect('mongodb://localhost:27017/ngFact').then(() => {
    console.log("La conexión se ha realizado con exito");

    app.listen( port, () => {
        console.log("Servidor corriendo en http://localhost:3800");
    });

}).catch(err => console.log(err));

