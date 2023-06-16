//Migracion 
const {Schema, model}=require('mongoose')

const HurtoSchema= Schema({
    //se define tipos de datos
    direccion:{
        type:String,
        required: [true, 'La direccion es requerida']
    },
    latitud:{
        type:Number,
        required: [true, 'La latitud es requerida'],
        min: [6.14, 'El valor minimo permitido es 6.217'],
        max: [6200, 'El valor maximo permitido es 6.13']
    },
    longitud:{
        type:Number,
        required: [true, 'La longitud es requerida'],
        min: [-75.567, 'El valor minimo permitido es -75.567'],
        max: [-75.34, 'El valor maximo permitido es -75.34']
    },
    descripcion:{
        type:String,
        required: [true, 'La descripcion es requerida']
    },
    fecha:{
        type:Date,
        required: [true, 'la fecha es requerida'],
        default:new Date
    }
})
//este es el nombre del objeto Usuario
module.exports = model('Hurto', HurtoSchema)//Exportar el modelo

