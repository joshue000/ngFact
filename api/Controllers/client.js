'use strict'

var moment = require('moment');
var mongoose = require('mongoose');

var User = require('../Models/user');
var Client = require('../Models/client');

function saveClient(req, res){

    var params = req.body;
    var client = new Client();

    if(params.name && params.surname && params.ci_ruc_passport && params.type_of_id){

        client.name = params.name;
        client.surname = params.surname;
        client.type_of_id = params.type_of_id;
        client.code = params.code;
        client.ci_ruc_passport = params.ci_ruc_passport;
        client.business = 2020;
        client.address = params.address;
        client.phone = params.phone;
        client.cupo = params.cupo;
        client.city = params.city;
        client.comment = params.comment;
        client.salesman = params.salesman;
        client.email = params.email;
        client.cta_contable = 110100101;
        client.zone = params.zone;
        client.created_at = moment().unix();
    
        client.save((err, clientStored) => {
            if(err) return res.status(500).send({message: 'Error en la petición'});
    
            if(!clientStored) return res.status(404).send({message: 'No se ha guardado la publicación'});
    
            return res.status(200).send({client: clientStored})
        });   

    }

}
/* 
async function generateCode(){


        var last = await Client.findOne().select().sort({$natural: -1}).limit(1).exec().then(
            (lastest) => {
                var code = lastest.code + 1;
                return code;
            }).catch((err) => {
                return handleError(err);
            });

    console.log(last);
} */

module.exports = {
    saveClient
}