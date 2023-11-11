const conexion = require("../base_de_datos/conexion")
const jwt = require('jsonwebtoken');

require('dotenv').config();

const esEntrenador = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, usuario) => {
        if (err) {
            return res .status(403).send({ status: "Fallo", data: { error: "Token inválido." } }); // Token inválido
        }


        conexion.query(`SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario as u WHERE u.idUsuario = ? AND activo = 1`, usuario.idUsuario,
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                console.log("archivo entrenador")
                let data
                data = result[0]       
                if (data.tipoUsuario != 1) {
                    return res.status(403).send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
                }
                next();
            }
        })

        // tipoUsuario = 0 presidente | decano
        // tipoUsuario = 1 entrenador | bedel


    });
};

module.exports = { esEntrenador };