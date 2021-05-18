var forma = document.getElementById('forma');
var n = document.getElementById('ramdom').innerHTML;
console.log(n);
//crear pregunta
function crearPregunta(id){
    let divPregunta = document.createElement('div');
    divPregunta.id = `div${id}`;
    divPregunta.setAttribute('class', 'mb-3 borde');
    forma.appendChild(divPregunta);
    
    let h3Pregunta = document.createElement('label');
    h3Pregunta.setAttribute('class', 'label-form fw-bold')
    h3Pregunta.innerHTML = `Pregunta #${id}`;
    divPregunta.appendChild(h3Pregunta);


    let textoPregunta = document.createElement('textarea');
    //textoPregunta.type = 'text';
    textoPregunta.id = `pregunta${id}`
    textoPregunta.name = textoPregunta.id;
    h3Pregunta.setAttribute('for', textoPregunta.id);
    textoPregunta.setAttribute('class','form-control')
    divPregunta.appendChild(textoPregunta);

    
    let parrafoSeleccionar = document.createElement('p');
    parrafoSeleccionar.id = `parrafo${id}`;
    parrafoSeleccionar.innerHTML = 'Seleccione el tipo de respuesta';
    divPregunta.appendChild(parrafoSeleccionar);

    crearSelect(divPregunta,id)
      
    
}
//programa main

function main(numeroPreguntas){
    let numero_preguntas = document.getElementById('numeroPreguntas');
    numero_preguntas.value = numeroPreguntas;

    let labelTitulo = document.createElement('label');
    labelTitulo.for = 'tituloEncuesta';
    labelTitulo.setAttribute('class', 'form-label fw-bold');
    labelTitulo.innerHTML = 'Titulo';
    forma.appendChild(labelTitulo);

    let cuadroTitulo = document.createElement('input');
    cuadroTitulo.id = 'tituloEncuesta';
    cuadroTitulo.name = 'tituloEncuesta';
    cuadroTitulo.type = 'text';
    cuadroTitulo.setAttribute('class', 'form-control mb-3')
    forma.appendChild(cuadroTitulo);

    for(let i = 1; i<=numeroPreguntas; i++){
        crearPregunta(i);
    }
    let submit = document.createElement('button');
    submit.setAttribute('class', 'btn btn-success');
    submit.innerHTML = 'Guardar Encuesta'
    forma.appendChild(submit);
}
//crear seleccion 

function crearSelect(div,id) {
    let selector = document.createElement('select');
    selector.id= `seleccion${id}`;
    selector.name= selector.id;
    selector.setAttribute('class', 'form-select');
    div.appendChild(selector);
    let opcionOne = document.createElement('option');
    let opcionTwo = document.createElement('option');
    let opcionThree = document.createElement('option');
    opcionOne.value= '';
    opcionOne.innerHTML='seleccione';
    opcionTwo.value= 'texto';
    opcionTwo.innerHTML = 'texto'
    opcionThree.value= 'multiple';
    opcionThree.innerHTML = 'Seleccion multiple';
    selector.appendChild(opcionOne);
    selector.appendChild(opcionTwo);
    selector.appendChild(opcionThree);
    seleccion(selector.id);


}



// probando la seleccion
function seleccion(seleccionId){
    let opciones = document.getElementById(seleccionId);
    opciones.addEventListener('change', ()=>{
        idDivPregunta = seleccionId.split('n');
        let parrafo = document.getElementById(`parrafo${idDivPregunta[1]}`)

        //console.log(idDivPregunta[1]);
        if(opciones.value=='texto'){
            //console.log('click texto')
            parrafo.innerHTML = 'Respuesta en texto';
            if(document.getElementById(`agregar${idDivPregunta[1]}`)){
                borrarOpcion(`${idDivPregunta[1]}`)
        }

        }
        else if(opciones.value=='multiple'){
            parrafo.innerHTML = 'Respuesta en seleccion multiple';
            crearOpcion(`${idDivPregunta[1]}`);
        }
        else{
            parrafo.innerHTML = 'Seleccione el tipo de respuesta';
            if(document.getElementById(`agregar${idDivPregunta[1]}`)){
                borrarOpcion(`${idDivPregunta[1]}`)
        }
    }
}) 
}
function borrarOpcion(idDiv){
    //console.log(`el id del div es ${idDiv}`)
    let padre = document.getElementById(`div${idDiv}`);
    let divAgregar = document.getElementById(`agregar${idDiv}`);
    let divBorrar = document.getElementById(`borrar${idDiv}`);
    let divRespuestas = document.getElementById(`respuestas${idDiv}`);
    padre.removeChild(divAgregar);
    padre.removeChild(divBorrar);
    padre.removeChild(divRespuestas);

}


function crearOpcion(idDiv){
    let divAgregar = document.createElement('i');
    let divBorrar = document.createElement('i');
    divAgregar.id = `agregar${idDiv}`;
    divAgregar.setAttribute('class', 'fas fa-plus');
    divBorrar.id = `borrar${idDiv}`;
    divBorrar.setAttribute('class','fas fa-minus')
    let padre = document.getElementById(`div${idDiv}`)
    let divRespuestas = document.createElement('div');
    divRespuestas.id = `respuestas${idDiv}`
    padre.appendChild(divAgregar)
    padre.appendChild(divBorrar)
    padre.appendChild(divRespuestas);
    crearRespuestaMultiple(idDiv);
}

function crearRespuestaMultiple(id){
    let botonAgregar = document.getElementById(`agregar${id}`);
    let botonBorrar = document.getElementById(`borrar${id}`);
    let padre = document.getElementById(`respuestas${id}`);
    let numeroRespuestas = document.createElement('input');
    numeroRespuestas.type = 'hidden';
    numeroRespuestas.id = `numeroRespuestas${id}`;
    numeroRespuestas.name = numeroRespuestas.id;
    padre.appendChild(numeroRespuestas); 
    let contador = 0;
    botonAgregar.addEventListener('click', ()=>{
        contador++;
        numeroRespuestas.value = contador;
        let cuadroRespuesta = document.createElement('input');
        cuadroRespuesta.id = `respuesta${contador}p${id}`
        cuadroRespuesta.name = cuadroRespuesta.id;
        cuadroRespuesta.setAttribute('class','form-control');
        let labelRespuesta = document.createElement('label');
        labelRespuesta.id = `label${contador}p${id}`
        labelRespuesta.setAttribute('class', 'form-label fw-bold');
        labelRespuesta.for = cuadroRespuesta.id;
        labelRespuesta.innerHTML = `Respuesta #${contador}`;
        padre.appendChild(labelRespuesta);
        padre.appendChild(cuadroRespuesta);
    });
    botonBorrar.addEventListener('click', ()=>{
        if(contador>0){
            let elementoBorrar = document.getElementById(`respuesta${contador}p${id}`)
            let labelBorrar = document.getElementById(`label${contador}p${id}`)
            padre.removeChild(labelBorrar)
            padre.removeChild(elementoBorrar)
            contador--;
            numeroRespuestas.value = contador;

        }
    })

}


/*function leerNumero(){
    let padro = document.querySelector('.container');
    let divNumeros = document.getElementById('numero-preguntas'); 
    let cuadroNumero = document.getElementById('cuadro-numero');
    let boton = document.getElementById('boton-numero');
    boton.addEventListener('click', ()=>{
        console.log(cuadroNumero.value);

        if(cuadroNumero.value > 0 && cuadroNumero<=20){
            //return cuadroNumero.value;
            console.log(cuadroNumero.value);
            return cuadroNumero.value;

        }
    }) 
} */
//main(3);
//leerNumero()

main(n);
