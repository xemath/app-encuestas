const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//var objeto = app.objeto1;

var objeto = {
    titulo:'Encuesta 1',
    autor:'¿Como se hacen los niños?',
    fecha: 'haciendo el amor',
}

//const Encuesta = Schema(construirObjeto(objeto));


const Encuesta = Schema({
    encuesta: Schema.Types.Mixed,
    respuestas : [{
        type: Schema.Types.ObjectId,
        ref:'respuestas'
    }]
}) 

module.exports = mongoose.model('prueba', Encuesta);
