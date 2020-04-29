'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SequencesSchema = Schema({
    
    seq: Number

});

module.exports = mongoose.model('Sequences', SequencesSchema);