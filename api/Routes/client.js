'use strict'

var express = require('express');
var ClientController = require('../Controllers/client');
var api = express.Router();
var md_auth = require('../Middlewares/authenticated');

api.post('/cliente', md_auth.ensureAuth, ClientController.saveClient);
//api.get('/upd-client', md_auth.ensureAuth, ClientController.generateCode);

module.exports = api;