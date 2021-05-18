console.log('pruebas');

var objeto = {
    titulo:'Encuesta 1',
    pregunta1:'¿Como se hacen los niños?',
    respuesta1: 'haciendo el amor',
    respuesta2: 'cogiendo',
    pregunta2: 'cuantos años tiene el master?'
}
//console.log(objeto);
//console.log(`el objeto tiene ${Object.keys(objeto).length} propiedadees`);

//arrayKeys  = Object.keys(objeto);
//console.log(arrayKeys);

function construirObjeto(objeto){
    let modelo = {};
    let arrayKeys = Object.keys(objeto);

    for(let i=0; i<arrayKeys.length; i++){
        let key = arrayKeys[i]
        modelo[arrayKeys[i]] = String;
    }
    return modelo;
}
objetoModelo = construirObjeto(objeto);
console.log(objetoModelo);