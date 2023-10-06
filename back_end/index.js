// framework express
const express = require("express")

// envio de correo electrónicos
const nodemailer = require("nodemailer");

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

// Contacto
app.post("/contacto", (req, res)=>{
    const {titulo, correo, mensaje} = req.body

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user:process.env.CORREO,
            pass:process.env.CLAVE
        }
    })

    const cuerpo = `<body style= "background-color: #155fd9">
	                    <h1 style="color: #f1c40f; font-size: 16px; margin: 16px">${titulo}</h1>
	                        <p style="color: #ffffff; font-size: 16px; margin: 16px">${mensaje}</p>
	                        <footer><p style="color: #ffffff; font-size: 16px; margin: 16px">Copyright© 2023 AFA / Todos los derechos reservados</p></footer>
                    </body>`;

    const opciones = {
        from : "api prog3",
        to: correo,
        subject: titulo,
        html: cuerpo
    }

    transporter.sendMail(opciones, (error, info) => {
        if(error){
            console.log("error -> ", error)
            const respuesta = 'correo no enviado'
            res.json({respuesta})
        }else{
            console.log(info)
            const respuesta = "correo enviado"
            res.json({respuesta})
        }
    })
})

app.listen(process.env.PUERTO, ()=>{
    console.log("API prog3 iniciada en el puerto: " + process.env.PUERTO)
})

// -------------------------  BASE DE DATOS -----------------------------------------------------------
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"scalonetta"

});

app.post("/create",(req,res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const camiseta = req.body.camiseta;
    const pierna = req.body.pierna;
    const posicion = req.body.posicion;


    db.query('INSERT INTO jugador(nombre,edad,camiseta,pierna,posicion) VALUES(?,?,?,?,?)',[nombre,edad,camiseta,pierna,posicion],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

 });
//  ----------------------------------------SOLICITA CON METODO GET A BASE DE DATOS UNA LISTA DE LOS JUGADORES--------------------------------------------XDD
 app.get("/jugador",(req,res)=>{
    db.query('SELECT * FROM jugador',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

 });




 //  ----------------------------------------ACTUALIZAR JUGADORES--------------------------------------------XD

 app.put("/update",(req,res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const camiseta = req.body.camiseta;
    const pierna = req.body.pierna;
    const posicion = req.body.posicion;


    db.query('UPDATE jugador SET nombre=?,edad=?,camiseta=?,pierna=?,posicion=? WHERE id=?',[nombre,edad,camiseta,pierna,posicion,id],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

 });

 //  ----------------------------------------ELIMINAR JUGADORES--------------------------------------------XD





 app.delete("/delete/:id",(req,res)=>{
    const id = req.params.id;

    db.query('DELETE FROM jugador WHERE id=?', id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

 });