'use strict'

var express = require('express');
var UserController = require('../Controllers/user');
var api = express.Router();
var md_auth = require('../Middlewares/authenticated');

//Rutas
api.get('/home', UserController.home);
api.post('/register', UserController.saveUser);
api.post('/login', UserController.loginUser);
api.get('/pruebas', md_auth.ensureAuth, UserController.pruebas);
api.get('/user/:id', md_auth.ensureAuth, UserController.getUser);
api.put('/update-user/:id', md_auth.ensureAuth, UserController.updateUser);

module.exports = api;