'use strict'

var express = require('express');
var bodyParser = require('body-parser');
var app = express(); 

//Cargar rutas
var user_routes = require('./routes/user');
var client_user = require('./Routes/client');


//Middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//Cors


//Rutas
app.use('/api', user_routes);
app.use('/api', client_user);

//Exportar
module.exports = app;