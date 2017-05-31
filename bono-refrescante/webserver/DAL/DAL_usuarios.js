// ##Importamos mongoose
var mongoose = require("mongoose");

// ##Establecemos las expresiones regulares.
var regDni = /(([X-Z]{1})([-]?)(\d{7})([-]?)([A-Z]{1}))|((\d{8})([-]?)([A-Z]{1}))/;
var regMail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
var regTel = /^([0-9]+){9}$/;


// ##Creamos el Schema para los usuarios (TABLA)
var usuarios = mongoose.Schema({
    dni : {
        type : String,
        match : [regDni,"{VALUE} no es ni un NIF ni un NIE valido."],
        required : [true, "El DNI/NIF no puede estar vacio."]    
    },
    nombre : {
        type : String,
        minlength : 1,
        maxlength : 20
    },
    apellidos : {
        type : String,
        maxlength : 50
    },
    nacimiento : {
        type : Date,
        required : [true, "La fecha de nacimiento es obligatoria."]
    },
    direccion : String,
    mail : {
        type : String,
        match : [regMail,"{VALUE} esta dirección de mail no es correcta."],
        required : [true, "El email es requerido."]
    },
    telefono : {
        type: String,
        match: [regTel, "{VALUE} este número de telefono no es correcto."],
        required : [true, "El teléfono es necesario."]
    },
    pais : String,
    localidad : String,
    poblacion : String,
    cp : Number,
    recorridos : Number,
    motoclub : String,
    moto : String,
    tipo : {
        type : String,
        enum : ["Piloto","Pasajero","Peaton"],
        required : [true, "Introduce un tipo válido(Piloto, Pasajero, Peatón)."]
    },
    bonos: [{type : mongoose.Schema.Types.ObjectId, ref: 'bonos' }],
    bonosusados: [{type : mongoose.Schema.Types.ObjectId, ref: 'bonos' }],
    id_inscripcion : {
        type : String,
        required : [true, "Se necesita un numero de inscripcion para poder dar de alta."]
    }
},
{
    toObject: {
        transform: function(doc,ret) {
            delete ret._id;
        }
    },
    toJSON: {
        transform : function(doc,ret){
            delete ret._id;
        }
    }
});
usuarios.set("toJSON",{virtuals: true});

// ##Exportamos esta tabla
module.exports.usuarios = mongoose.model("usuarios",usuarios);

// ##Creamos el Schema para los Bonos (TABLA)
var bonos = mongoose.Schema({
    nombre : {
        type : String,
        required : [true, "Necesito un nombre."]
    },
    fecha : {
        type : Date,
        required : [true, "Necesito una fecha."]
    },
    horainicio : Date,
    horafin : Date,
    lugar : {
        type : String,
        required : [true, "Necesito un lugar."]
    },
    descripcion : String,
    imagen : {
        type : String,
        required : [true, "Se necesita un link a una imagen."]
    },
    link : String,
    coordenadas : String
},
{
    toObject: {
        transform: function(doc,ret) {
            delete ret._id;
        }
    },
    toJSON: {
        transform : function(doc,ret){
            delete ret._id;
        }
    }
});
bonos.set("toJSON",{virtuals: true});

// ##Exportamos el modelo de los bonos
module.exports.bonos = mongoose.model("bonos",bonos);

// ##Creamos el Schema para los Eventos 
//var eventos = mongoose.Schema({
//    nombre : {
//        type : String,
//        required : [true, "Necesito un nombre para el evento."]
//    },
//    lugar : String,
//    inicio : Date,
//    fin : Date,
//    coordenadas : String,
//    descripcion : String
//})

// ##Exportamos el modelo de los eventos
//module.exports.eventos = eventos;