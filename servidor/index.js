// framework express
const express = require('express');

// envio de correo electrónicos
const nodemailer = require('nodemailer');

// para gestionar cors
const cors = require('cors');

// manejo de variables de entorno
require('dotenv').config();

// mi app servidor 
const app = express();

// recibimos datos en formato json
app.use(express.json());
// urlconded se encarga de analizar los datos codificados en la url y los coloca en el req.body 
// para poder trabajar con ellos en el manejdaor de la ruta.
app.use(express.urlencoded({extended:true}))

app.use(cors());

// endpoint de testeo del API
app.get("/", (req, res)=>{
    // const saludo = 'bienvenido a prog3 - 2023!';
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});


app.post("/contacto", (req, res)=>{
    const {titulo, correo, mensaje} = req.body;

    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })

    //TAREA: mejorar el cuerpo del correo
    const cuerpo = `<h1>${mensaje}</h1>`;

    const opciones = {
        from : "api prog3",
        to: correo,
        subject: titulo,
        html: cuerpo
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            console.log('error -> ', error);
            const respuesta = 'correo no enviado';
            res.json({respuesta});
        }else{
            console.log(info);
            const respuesta = 'correo enviado';
            res.json({respuesta});
        }
    })
})

app.listen(process.env.PUERTO, ()=>{
    console.log("API prog3 iniciada " + process.env.PUERTO);
})