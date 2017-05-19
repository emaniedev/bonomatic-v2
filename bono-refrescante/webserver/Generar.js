var express = require("express");
var bodyparser = require("body-parser");
var conexion = require("./DAL/conexion.js");
var modelo = require("./DAL/DAL_usuarios.js");
var generados = require("./backup-bonos.json");


var path = "10.1.1.222";

conexion.crearConexion(path);

//      PARA USUARIOS
//     var usuarios = conexion.getModelUsuario();
// 
//     generados.forEach(function(dato) {
//         var nuevo = new usuarios(dato)
//         nuevo.save(function(err,usr){
//             if(!err){
//                 console.log(nuevo);
//             }else{
//                 console.log("No se ha podido crear el usuario por: " + err)
//             }
//         })
//     }, this);

//      PARA BONOS
    var bonos = conexion.getModelBono();

    generados.forEach(function(dato) {
        var nuevo = new bonos(dato)
        nuevo.save(function(err,bono){
            if(!err){
                console.log(bono)
            }else{
                console.log("No se ha podido crear el Bono por: " + err)
            }
        })
    }, this);



    //Cerramos la conexión
conexion.cerrarConexion();
    