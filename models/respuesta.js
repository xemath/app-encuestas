const mongoose = require('mongoose');
const { schema } = require('./encuesta');
const Schema = mongoose.Schema;



const Respuesta = Schema({
    respuesta: Schema.Types.Mixed,
    encuesta: {
        type: Schema.Types.ObjectId,
        ref: 'pruebas'
    }
}) 

module.exports = mongoose.model('respuesta', Respuesta);
