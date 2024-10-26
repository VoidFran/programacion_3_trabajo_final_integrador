// framework express
const express = require("express")

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

// configuracion de passport
const passport = require("passport")
require("./config/passport")

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

const {esEntrenador} = require("./middlewares/esEntrenador");
const {esPresidente} = require("./middlewares/esPresidente");

// endpoint de testeo del API
app.get('/', (req, res)=>{
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});

// middleware
// middleware que contiene las condiciones para dar acceso al recurso
// recibir un token valido y que sea un perfil "entrenador"
app.use('/api/contacto', contacto);
app.use('/api/usuario', usuario);
app.use('/api/futbolistas', [passport.authenticate('jwt', {session: false}), esEntrenador], futbolistas);
app.use('/api/archivo', archivo);
app.use('/api/convocatorias', [passport.authenticate('jwt', {session: false}), esEntrenador], convocatorias);
app.use('/api/convocar', convocar);
app.use('/api/convocados', convocados);
app.use('/api/rivales', rivales);
app.use('/api/equipo_titular', [passport.authenticate('jwt', {session: false}), esEntrenador], equipo_titular);
// En algunas rutas sale error 401 no autorizado en el front(como en el de convocatorias), en el back funciona
//Request failed with status code 401
//AxiosError: Request failed with status code 401

// ejecuta el servidor
app.listen(process.env.PUERTO, ()=>{
    console.log("API prog3 iniciada en el puerto: " + process.env.PUERTO)
})