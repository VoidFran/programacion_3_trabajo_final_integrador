const conexion = require("../base_de_datos/conexion")
const jwt = require('jsonwebtoken');

require('dotenv').config();

const esPresidente = async (req, res, next) => {

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // El token es enviado utilizando "Bearer"

    if (!token) {
        return res.sendStatus(401); // No autorizado
    }

    jwt.verify(token, process.env.JWT_SECRET, async (err, usuario) => {
        if (err) {
            return res .status(403).send({ status: "Fallo", data: { error: "Token inválido." } }); // Token inválido
        }

        const data = await conexion.buscarPorId(usuario.idUsuario);

        // tipoUsuario = 0 presidente | decano
        // tipoUsuario = 1 entrenador | bedel
        if (data.tipoUsuario != 0) {
            return res.status(403).send({ status: "Fallo", data: { error: "No tiene los privilegios necesarios." } });
        }

        next();
    });
};

module.exports = { esPresidente };