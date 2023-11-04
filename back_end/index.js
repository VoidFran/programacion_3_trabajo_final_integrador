// framework express
const express = require("express")
const bodyParser = require('body-parser');

// para gestionar cors
const cors = require("cors")

// manejo de variables de entorno
require("dotenv").config();

// mi app servidor 
const app = express();

// recibimos datos en formato json
app.use(express.json());
// urlconded se encarga de analizar los datos codificados en la url y los coloca en el req.body 
// para poder trabajar con ellos en el manejdaor de la ruta.
app.use(express.urlencoded({extended:true}))

app.use(cors());

// accede a la carpeta de las imagenes
app.use(express.static("publico"))

// rutas del api
const futbolistas = require('./rutas/futbolistas');
const archivo = require('./rutas/archivo');
const convocatorias = require('./rutas/convocatorias');
const rivales = require('./rutas/rivales');
const convocar = require('./rutas/convocar');
const convocados = require('./rutas/convocados');
const equipo_titular = require('./rutas/equipo_titular');
const contacto = require('./rutas/contacto');
const usuario = require('./rutas/usuario');
const estadistica = require('./rutas/estadisticas');

// middleware
app.use('/api', futbolistas);
app.use('/api', archivo);
app.use('/api', convocatorias);
app.use('/api', rivales);
app.use('/api', convocar);
app.use('/api', convocados);
app.use('/api', equipo_titular);
app.use('/api', contacto);
app.use('/api', estadistica);
app.use(bodyParser.json());

// endpoint de testeo del API
app.get('/', (req, res)=>{
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});

// ejecuta el servidor
app.listen(process.env.PUERTO, ()=>{
    console.log("API prog3 iniciada en el puerto: " + process.env.PUERTO)
})