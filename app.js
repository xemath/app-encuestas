const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const encuesta = require('./models/encuesta');
const Schema = mongoose.Schema;
const app = express();
const session = require('express-session');
const Encuesta = require('./models/encuesta');
const Respuesta = require('./models/respuesta');


const PORT = process.env.PORT || 3000;

//express middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(morgan('dev'));

app.set('view engine', 'ejs');
//session 
app.use(session({
    secret:'myllaveSecreta',
    resave:false,
    saveUninitialized:false,
}));
// conexion mongoDB
const user = 'xemath';
const password = 'admin';
const nameDb = 'project';
const url = `mongodb+srv://${user}:${password}@cluster0.vwsk9.mongodb.net/${nameDb}?retryWrites=true&w=majority`;

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log('base de datos conectada'))
.catch(e => console.log(e));

// mis funciones

// rutas
app.get('/crear', (req, res, next)=>{
    if(!req.session.numero){
        next(res.render('numeropreguntas'));
        console.log('no hay numero');
    }

    
    
    else{
        objeto = {
            numero:req.session.numero
        }
        delete req.session.numero;
        res.render('index', { numero: objeto});
    }
    
    
        

    
    
    
})
app.get('/media', (req,res)=>{
    res.render('numeropreguntas');    
})

app.get('/pruebas', (req, res)=>{
    res.render('navBar');
})
app.post('/save-encuesta', async(req,res)=>{
    console.log(req.body);
    
    const prueba = {
        encuesta: req.body
    }

    const encuesta = new Encuesta(prueba);
    await encuesta.save();
    res.redirect('/')
})

app.post('/medias', (req,res)=>{
    console.log(req.body);
    req.session.numero = req.body.numero;
    res.redirect('/crear')
})


app.get('/login', (req,res)=>{
    res.render('login');
})

app.get('/', async(req,res)=>{
    let querico = await Encuesta.find();
    //console.log(querico[0].encuesta.tituloEncuesta);
    res.render('encuestas', {querico:querico} );

})

app.post('/respuestas-encuesta', async(req,res)=>{
    console.log(req.body);
    const prueba = {
        respuesta: req.body,
        encuesta: req.body.id
    }

    const respuesta = new Respuesta(prueba);
    await respuesta.save();
    res.redirect('/');
})

app.get('/encuesta/:id', async(req, res)=>{
    let id = req.params.id;
    let encusta = await Encuesta.findById(id);
    //console.log(`el id del item de la es ${req.params.id}`);
    //console.log(encusta);
    res.render('encuesta',{encuesta:encusta});
})


app.post('/login', (req,res)=>{
    if(req.body.nick == 'admin' && req.body.pass == 'admin'){
        req.session.logged = true;
        res.redirect('/panel');
    }
    else{
        res.redirect('/login');}
})
app.get('/panel', async(req,res)=>{
    if(req.session.logged){
        let querico = await Encuesta.find();
        delete req.session.logged;
        res.render('panel', {querico:querico});
    }
    else{
        res.redirect('/login');
    }
    
})
app.get('/delete/:id', async(req,res)=>{
    console.log(req.params);
    let id = req.params.id;
    await Encuesta.remove({_id: id});
    res.redirect('/panel');
})
app.listen(PORT, ()=>{
    console.log('funcionando')
})
