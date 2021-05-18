var form = document.getElementById('forma');
var campos = document.querySelectorAll('textarea')
var selecciones = document.querySelectorAll('select');
var pregunta1 = document.getElementById('pregunta1')




function chequeador() {
    let chequear = true;
    campos.forEach((campo)=>{
        console.log(campo.value)
        if(campo.value=='' || campo.value == null){
            chequear = false;
        }
    })

    selecciones.forEach((seleccion)=>{
        console.log(seleccion.value)
        if(seleccion.value == '' || seleccion.value == null){
            chequear = false;
        }
        
    })

    let respuestas = document.querySelectorAll('input');
    respuestas.forEach((respuesta)=>{
        if(respuesta.value == '' || respuesta.value == null){
            chequear = false;
        }
    })

    return chequear;
}

form.addEventListener('submit',(e)=>{
    if(chequeador()==false){
        e.preventDefault();
    }
    
})
