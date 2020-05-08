'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductSchema = Schema({
    
    description: String,
    reference: String,
    code: Number,
    class: String,
    group: Number,
    line: Number,
    specie: Number,
    quality: Number,
    provider: Number,
    business: Number,
    measure: Number,
    iva: Boolean,
    comment: String,
    barCode: Number,
    cost: Number,
    price1: Number,
    price2: Number,
    price3: Number

});

module.exports = mongoose.model('Product', ProductSchema);