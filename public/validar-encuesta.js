let checkbox = document.querySelectorAll('input');
var forma = document.querySelector('form');
var respuestas = document.querySelectorAll('textarea');

let multiples = document.querySelectorAll('input[type="radio"]')
//console.log(multiples[0].name);

function obtenerMultipleRespuestas() {
    let nombreAnterior = '';
    let nombres = [];

    for(let i=0; i<multiples.length; i++){
        if(multiples[i].name != nombreAnterior){
            nombreAnterior = multiples[i].name;
            console.log(multiples[i].name);
            nombres.push(nombreAnterior)
        }
    
    }
    return nombres;
}

var listaNombres = obtenerMultipleRespuestas();
console.log(listaNombres);
function seleccionarRespuestas(lista){ 
    let elemento;
    //console.log(document.getElementsByName(lista[0]))
    for(let i =0; i<lista.length; i++){
        let checkeado = false;
        elemento = document.getElementsByName(lista[i]);
        for(let j = 0; j<elemento.length; j++){
            if(elemento[j].checked){
                checkeado = true;
            }
            else if(j == (elemento.length-1) && checkeado==false){
                checkeado == false;
                return false;
            }
        }
        if((i == lista.length-1) && checkeado==true){
            return true;
        }
    }
}



function chequeador() {
    let chequear = true;
    checkbox.forEach((campo)=>{
        console.log(campo.value)
        if(campo.value=='' || campo.value == null){
            chequear = false;
        }
    })

    

    
    respuestas.forEach((respuesta)=>{
        if(respuesta.value == '' || respuesta.value == null){
            chequear = false;
        }
    })

    return chequear;
}

forma.addEventListener('submit',(e)=>{
    if(chequeador()==false || seleccionarRespuestas(listaNombres)==false ){
        e.preventDefault();
    }
    
})