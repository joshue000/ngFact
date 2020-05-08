'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Seq_ProductsSchema = Schema({
    
    seq: Number

});

module.exports = mongoose.model('Seq_Products', Seq_ProductsSchema);