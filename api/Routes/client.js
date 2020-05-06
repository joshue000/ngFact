'use strict'

var express = require('express');
var ClientController = require('../Controllers/client');
var api = express.Router();
var md_auth = require('../Middlewares/authenticated');

api.post('/cliente', md_auth.ensureAuth, ClientController.saveClient);
api.put('/upd-client/:code', md_auth.ensureAuth, ClientController.updateClient);

module.exports = api;