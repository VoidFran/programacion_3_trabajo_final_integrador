const jwt = require('jsonwebtoken');
const usuarioDB = require('../base_de_datos/conexion');
const buscarPorId = require("../controladores/usuario");

require('dotenv').config();

const esEntrenador = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(buscarPorId, token, process.env.JWT_SECRET, async (err, usuario) => {
        if (err) {
            return res.status(403).send({ status: "Fallo", data: { error: "Token inválido." } }); // Token inválido
        }

        const data = await usuarioDB.buscarPorId(usuario.idUsuario);

        // tipoUsuario = 1 para presidente o decano
        if (data.tipoUsuario !== 1) {
            return res.status(403).send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
        }

        next();
    });
};

const esPresidente = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(buscarPorId,token, process.env.JWT_SECRET, async (err, usuario) => {
        if (err) {
            return res.status(403).send({ status: "Fallo", data: { error: "Token inválido." } }); // Token inválido
        }

        const data = await usuarioDB.buscarPorId(usuario.idUsuario);

        // tipoUsuario = 0 para presidente o decano
        if (data.tipoUsuario !== 0) {
            return res.status(403).send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
        }

        next();
    });
};

module.exports = { esEntrenador, esPresidente };
