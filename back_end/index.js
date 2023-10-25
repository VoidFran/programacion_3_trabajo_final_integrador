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
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"scaloneta12"

});

app.post("/create",(req,res)=>{
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const posicion = req.body.posicion;
    const apodo = req.body.apodo;
    const foto = req.body.foto;
    const pieHabil = req.body.pieHabil;
    const activo = req.body.activo;

    db.query('INSERT INTO futbolista(dni,nombre,apellido,posicion,apodo,foto,pieHabil,activo) VALUES(?,?,?,?,?,?,?,?)',[dni, nombre, apellido, posicion, apodo, foto, pieHabil, activo],
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
    db.query('SELECT * FROM futbolista WHERE activo = 1',
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
    const idFutbolista = req.body.idFutbolista;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const posicion = req.body.posicion;
    const apodo = req.body.apodo;
    const foto = req.body.foto;
    const pieHabil = req.body.pieHabil;
    const activo = req.body.activo;


    db.query('UPDATE futbolista SET dni=?,nombre=?,apellido=?,posicion=?,apodo=?,foto=?,pieHabil=?,activo=? WHERE idFutbolista=?',[dni, nombre, apellido, posicion, apodo, foto, pieHabil, activo, idFutbolista],
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

    db.query('DELETE FROM futbolista WHERE idFutbolista=?', id,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );

 });

 // Convocatorias
 app.get("/convocatoria", (req, res) => {
    db.query('SELECT * FROM convocatoria',
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post("/convocatorias_agregar", (req, res) => {
    const fecha = req.body.fecha
    const rival = req.body.rival
    const golesRecibidos = req.body.golesRecibidos
    const golesConvertidos = req.body.golesConvertidos

    db.query("INSERT INTO convocatoria(fecha, rival, golesRecibidos, golesConvertidos) VALUES(?, ?, ?, ?)", [fecha, rival, golesRecibidos, golesConvertidos],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post("/convocatorias_editar", (req, res) => {
    const idConvocatoria = req.body.idConvocatoria
    const fecha = req.body.fecha
    const rival = req.body.rival
    const golesRecibidos = req.body.golesRecibidos
    const golesConvertidos = req.body.golesConvertidos
    
    db.query("UPDATE convocatoria SET fecha = ?, rival = ?, golesRecibidos = ?, golesConvertidos = ? WHERE idConvocatoria = ?", [fecha, rival, golesRecibidos, golesConvertidos, idConvocatoria],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete("/convocatorias_eliminar/:id", (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM convocatoria WHERE idConvocatoria = ?", id,
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.get("/rivales", (req, res) => {
    db.query('SELECT * FROM rival WHERE activo = 1',
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post("/rivales_agregar", (req, res) => {
    const nombre = req.body.nombre
    const activo = req.body.activo

    db.query("INSERT INTO rival(nombre, activo) VALUES(?, ?)", [nombre, activo],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.post("/rivales_editar", (req, res) => {
    const idRival = req.body.idRival
    const nombre = req.body.nombre
    const activo = req.body.activo
    
    db.query("UPDATE rival SET nombre = ?, activo = ? WHERE idRival = ?", [nombre, activo, idRival],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.delete("/rivales_eliminar/:id", (req, res) => {
    const id = req.params.id

    db.query("DELETE FROM rival WHERE idRival = ?", id,
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})

app.get("/convocados", (req, res) => {
    db.query('SELECT * FROM futbolistaconvocatoria WHERE activo = 1',
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post("/convocados_agregar/:id", (req, res) => {
    const convocados_lista = req.body.convocados_lista
    const id = req.params.id

    db.query("INSERT INTO futbolistaconvocatoria(futbolista, convocatoria) VALUES(?, ?)", [convocados_lista, id],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
})