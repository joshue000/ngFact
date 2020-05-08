'use strict'

var mongoose = require('mongoose');

var Product = require('../Models/product');
var Sequence = require('../Models/sequences_product');

function saveProduct(req, res){

    var params = req.body;
    var product = new Product();
    var name = '5eb44921f8d5cbcf42e3c82b';
    var sequ;

    nextVal(name).then((value) => {
        
        sequ = value;

        product.description = params.description;
        product.reference = params.reference;
        product.code = sequ;
        product.class = params.class;
        product.group = params.group;
        product.line = params.line;
        product.specie = params.specie;
        product.quality = params.quality;
        product.provider = params.provider;
        product.business = 2020;
        product.measure = params.measure;
        product.iva = params.iva;
        product.comment = params.comment;
        product.barCode = params.barCode;
        product.cost = params.cost;
        product.price1 = params.price1;
        product.price2 = params.price2;
        product.price3 = params.price3

        product.save((err, productStored) => {

            if(err) return res.status(500).send({message: 'Error en la petición'});

            if(!productStored) return res.status(404).send({message: 'No se ha guardado el producto'});

            return res.status(200).send({message: productStored})

        });

    });

}

async function nextVal(name){ //Metodo para incrementar el valor del secuencial y crear el codigo del cliente

    var ret = await Sequence.findByIdAndUpdate({_id: name}, {$inc: {seq: 1}}, {new: true}).exec().then((seq) => {
        return seq;
    }).catch();

    return ret.seq;
}

function updateProduct(req, res){

    var productCode = req.params.code;
    var update = req.body;

    Product.findOne({code: productCode}, (err, product) => {

        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(product && product._id){

            Product.findByIdAndUpdate(product._id, update, {new:true}, (err, productUpdated) => {

                if(err) return res.status(500).send({message: 'Error en la petición'});

                if(!productUpdated) return res.status(404).send({message: 'No se ha podido actualizar el producto'});

                return res.status(200).send({product: productUpdated});

            });

        }

    });
}

function deleteProduct(req, res){

    var productCode = req.params.code;

    Product.find({'code': productCode}).remove((err, productRemoved) => {

        if(err) return res.status(500).send({message: 'Error al intentar eliminar el producto'});

        if(productRemoved) return res.status(404).send({message: 'Cliente no existe o ya fue eliminado'});

        return res.status(200).send({message: 'El cliente ha sido eliminado'})

    });

}

module.exports = {
    saveProduct,
    updateProduct,
    deleteProduct
}