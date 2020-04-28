'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClientSchema = Schema({
    
    name: String,
    surname: String,
    code: Number,
    type_of_id: Number,
    ci_ruc_passport: String,
    business: Number,
    address: String,
    phone: Number,
    cupo: Number,
    city: String,
    comment: String,
    salesman: Number,//Vendedor deberá apuntar a la colección  de vendedor en mongo
    email: String,
    cta_contable: String,
    zone: String,
    created_at: String

});

module.exports = mongoose.model('Client', ClientSchema);