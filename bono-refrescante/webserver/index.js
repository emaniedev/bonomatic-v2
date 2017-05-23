var express = require("express");
var bodyparser = require("body-parser");
var conexion = require("./DAL/conexion.js");
var modelo = require("./DAL/DAL_usuarios.js")

var app = express();
app.use(bodyparser());
console.log("Listo");

var path = "10.1.1.222";
var port = 3000;

app.use(express.static(__dirname + "/../www"));

// PERMITIR CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// ##Definimos el get a usuarios.
app.get("/api/pub/usuarios", function (req, res, next) {
    
    conexion.crearConexion(path);
    console.log(conexion);
    var usuarios = conexion.getModelUsuario();
    
    usuarios.find({}).limit(20)
    .exec(function(err, users){
        if(!err){
            res.json(users);
        }else{
            res.send({"error" :"No se ha podido conseguir los usuarios"});
        }
        console.log(res);
    }).then(conexion.cerrarConexion());
    
    
           
    
}).get("/api/pub/usuario/inscripcion/:ins",function(req,res,next){

    conexion.crearConexion(path);
   
    var usuarios = conexion.getModelUsuario();
    console.log("Este parametro llega-> "+req.params.ins);
    usuarios.find({idInscripcion: Number.parseInt(req.params.ins)})
    .populate({
        path: 'bonos',
        options : { sort: {horainicio : 1}}
    })
    .populate({
        path: 'bonosusados',
        options : { sort: {horainicio : 1}}
    })
    .exec(function(err,usr){
        if (!err){
            
            res.json(usr);
        }else{
            res.send({"dni" : "error"})
        }
    })

    // usuarios.find({idInscripcion: Number.parseInt(req.params.ins)}).exec(function(err,usr){
//         if (!err){
//             res.json(usr);
//             console.log(usr);
//         }else{
//             res.send({"dni" :"error"})
//         }
//     }).then(conexion.cerrarConexion());
   
})

//GET de bonos          TODO: Buscar la forma de que salgan los del usuario.
.get("/api/pub/bono/:id",function(req,res, next){
    conexion.crearConexion(path);
    console.log(conexion);
    var bonos = conexion.getModelBono();
    console.log("Esta es la variable req :-> " + req);
    bonos.find({_id: req.params.id}).exec(function(err,bono){
        if(!err){
            res.json(bono);
        }else{
            res.send("No se han podido conseguir los bonos y esto es lo que trae req " + req)
        }
        console.log(res);
    }).then(conexion.cerrarConexion());
})


// ##Definimos el post a usuarios.
.post("/api/pub/usuarios",function(req, res, next){
    conexion.crearConexion(path);
    var usuarios = conexion.getModelUsuario();
    var nuevo = new usuarios(req.body)
    nuevo.save(function(err,usr){//TODO: ver que hace el parametro usr.
        if(!err){
            res.json(nuevo);
            console.log(usr);
        }else{
            res.send("No se ha podido crear el usuario por: " + err)
        }
    })
    
});


app.get("/test",function(req, res, next){
    res.send("<h1>El get del Express funciona perfectamente</h1>");
    res.send()
});

console.log("Esperando en http_//localhost:" + port);
app.listen(port);
console.log("go");


    
