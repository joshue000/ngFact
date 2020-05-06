'use strict'

var moment = require('moment');
var mongoose = require('mongoose');

var User = require('../Models/user');
var Client = require('../Models/client');
var Sequence = require('../Models/sequences');


function saveClient(req, res){

    var params = req.body;
    var client = new Client();
    var name = '5eb20ce17eff8cb04f9954b2';
    var sequ;

    if(params.name && params.surname && params.ci_ruc_passport && params.type_of_id){

        nextVal(name).then((value) => {

            sequ = value;

            client.name = params.name;
            client.code = sequ;
            client.surname = params.surname;
            client.type_of_id = params.type_of_id;
            client.ci_ruc_passport = params.ci_ruc_passport;
            client.business = 2020;
            client.address = params.address;
            client.phone = params.phone;
            client.cupo = params.cupo;
            client.city = params.city;
            client.comment = params.comment;
            client.salesman = params.salesman;
            client.email = params.email;
            client.cta_contable = 110101011;
            client.zone = params.zone;
            client.created_at = moment().unix();
        
            client.save((err, clientStored) => {
                if(err) return res.status(500).send({message: 'Error en la petición'});
        
                if(!clientStored) return res.status(404).send({message: 'No se ha guardado la publicación'});
        
                return res.status(200).send({client: clientStored})
            });
        });         

    }

}

async function nextVal(name){ //Metodo para incrementar el valor del secuencial y crear el codigo del cliente

    var ret = await Sequence.findByIdAndUpdate({_id: name}, {$inc: {seq: 1}}, {new: true}).exec().then((seq) => {
        return seq;
    }).catch();

    return ret.seq;
}


module.exports = {
    saveClient

}