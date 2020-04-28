'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    name: String,
    surname: String,
    username: String,
    password: String,
    business: Number,
    role: String
});

module.exports = mongoose.model('Product', ProductSchema);