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

// rutas del api
const futbolistas = require('./rutas/futbolistas');
const contacto = require('./rutas/contacto');

// middleware
app.use('/api', futbolistas);
app.use('/api', contacto);

// endpoint de testeo del API
app.get('/', (req, res)=>{
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});

app.listen(process.env.PUERTO, ()=>{
    console.log("API prog3 iniciada en el puerto: " + process.env.PUERTO)
})