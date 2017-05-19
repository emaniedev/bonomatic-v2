var express = require("express");
var bodyparser = require("body-parser");
var conexion = require("./DAL/conexion.js");
var modelo = require("./DAL/DAL_usuarios.js");
var generados = require("./backup-usuarios2.json");


var path = "10.1.1.222";

conexion.crearConexion(path);
var usuarios = conexion.getModelUsuario();

generados.forEach(function(dato) {
    var nuevo = new usuarios(dato)
    nuevo.save(function(err,usr){
        if(!err){
            console.log(nuevo);
        }else{
            console.log("No se ha podido crear el usuario por: " + err)
        }
    })
}, this);
    conexion.cerrarConexion();
    