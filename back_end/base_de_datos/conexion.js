// -------------------------  BASE DE DATOS -----------------------------------------------------------
const mysql = require("mysql2")

const conexion = mysql.createConnection({
    host: "localhost",
    user: "scaloneta12",
    database: "scaloneta12",
    password: ""
});

module.exports = conexion