var mongoose = require("mongoose");
var modelo = require("./DAL_usuarios.js")


//var conexion = function () {

    var texto = "Porque no vas";

    var crearConexion = function (path) {

        var user = "admin-bonomatic";
        var pasw = "xyZAlfa0meg4";
        var port = "27017";

        //var url = "mongodb://" + user + ":" + pasw + "@" + path ;
        var url = "mongodb://" + path + ":" + port + "/DebugBonomatic";

        console.log(url)

        mongoose.connect(url);
        
        var db = mongoose.connection;
        
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log("Estamos Dentro de esta ip: " + path);
        });

    };

    var cerrarConexion = function(){
        mongoose.disconnect(function(err){
            if(!err){
                console.log("Se ha cerrado la conexión satisfactoriamente.")
            }else{
                console.log("No se ha podido cerrar la conexion por: " + err)
            }
        })
    }
    
    var getModelUsuario = function (){
        return modelo.usuarios;
    }

/***
        Para Debug **************************
*/
    var crearUsuario = function () {
        
        var Usuario = mongoose.model("Usuario",modelo.usuarios);
        var nuevo = new Usuario({
            dni : "71956901-K",
            nombre : "Rocio",
            apellidos : "Maestro Montoya",
            nacimiento : new Date(1990,12,24),
            direccion : "calle Francisco Vighi",
            mail : "rociomaestro@outlook.es",
            telefono : "645202736",
            pais : "Andorra",
            localidad : "La Bella",
            poblacion : "Andorra",
            cp : 34003,
            recorridos : 0,
            motoclub : "La Roci Manda y No Tu Banda",
            moto : "GS500 F",
            tipo : "Pasajero"
        });
        
        nuevo.save(function (err,nuevo){
            if (err){
                return console.error(err);
            }
        });


    };
//    return this;
//}
//module.exports.conexion = conexion;

    module.exports.texto = texto;
    module.exports.crearConexion = crearConexion;
    module.exports.getModelUsuario = getModelUsuario;
    module.exports.cerrarConexion = cerrarConexion;
    

