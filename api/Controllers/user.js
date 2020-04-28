'use strict'

var User = require('../Models/user');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../Services/jwt');

function home(req, res){
    res.status(200).send({
        message: 'Hola desde el servidor'
    });
}

function saveUser(req, res){

    var params = req.body;//Parametros recibidos por formulario
    var user = new User();

    if (params.name && params.surname && params.username && params.password){
        
        user.name = params.name;
        user.surname = params.surname;
        user.username = params.username;
        user.business = 2020;
        user.role = 'ROLE_USER';

        User.find({username: user.username.toLowerCase()}).exec((err, users) => {
            
            if(err) return res.status(500).send({message: 'Error en la petición de usuarios'});

            if(users && users.length >= 1){
                return res.status(200).send({message: 'El usuario ya existe'});
            } else {
                //se encripta la contraseña
                bcrypt.hash(params.password, null, null, (err, hash) => {

                    user.password = hash;
        
                    user.save((err, userStored) => {
                        
                        if(err) return res.status(500).send({message: 'Error al guardar usuario'});
        
                        if(userStored){
                            res.status(200).send({user: userStored});
                        } else {
                            res.status(404).send({message: 'No se ha registrado el usuario'});
                        }
                    });
        
                });

            }

        });

    } else{

        res.status(200).send({

           message: 'Envía todos los campos' 

        });

    }
}

function pruebas(req, res){
    res.status(200).send({
        message: 'Acción de pruebas server NodeJS'
    });
}

function loginUser(req, res){
    
    var params = req.body;
    var username = params.username;
    var password = params.password;

    User.findOne({username: username}, (err, user) => {

        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(user){//se comprueba la contraseña
            bcrypt.compare(password, user.password, (err, check) => {

                if(check){

                   if(params.gettoken){

                        return res.status(200).send({
                            token: jwt.createToken(user)
                        });

                   } else{

                        user.password = undefined;
                        return res.status(200).send({user});

                   }

                } else{

                    return res.status(404).send({message: 'El usuario no se ha podido identificar'});

                }
            });
        } else{

            return res.status(404).send({message: 'El usuario no se ha podido identificar'});

        }

    });

}

function getUser(req, res){

    var userId = req.params.id;

    User.findById(userId, (err, user) => {
        
        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(!user) return res.status(404).send({message: 'El usuario no existe'});

        return res.status(200).send({user});

    });
}

function updateUser(req, res){

    var userId = req.params.id;
    var update = req.body;

    delete update.password;

    if(userId != req.user.sub){
        
        return res.status(500).send({message: 'No tienes permiso para actualizar los datos del usuario'});

    }

    User.findByIdAndUpdate(userId, update, {new: true}, (err, userUpdated) =>{

        if(err) return res.status(500).send({message: 'Error en la petición'});

        if(!userUpdated) return res.status(404).send({message: 'No se ha podido actualizar el usuario'});

        return res.status(200).send({user: userUpdated});

    });

}

module.exports = {
    home,
    saveUser,
    loginUser,
    pruebas,
    getUser,
    updateUser
}