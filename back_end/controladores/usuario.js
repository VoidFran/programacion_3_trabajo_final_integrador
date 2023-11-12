const conexion = require('../base_de_datos/conexion');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
                                                                    
const usuario = async (req, res) => {
    const correo = req.body.correo;
    const clave = req.body.clave;
    let usuario = {}
    let idUsuario = 0
    let tipoUsuario = 0

    // Hashea la contraseña ingresada con SHA-256
    const claveHasheada = crypto.createHash('sha256').update(clave).digest('hex');

    const consulta = 'SELECT * FROM usuario WHERE correoElectronico = ? AND clave = SHA2(?, 256) AND activo = 1';

    try {
        conexion.query(consulta, [correo, clave], (err, resu) => {
            
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en la consulta a la base de datos' });
            } else {
                if (resu.length > 0) {
                    idUsuario = resu[0].idUsuario
                    tipoUsuario = resu[0].tipoUsuario
                    usuario = {idUsuario, tipoUsuario, correo, claveHasheada}

                    const token = jwt.sign(usuario, process.env.JWT_SECRET);
                    const decodificarToken = jwt.decode(token);
                    const tiempoToken = Math.floor(Date.now() / 1000);

                    return res.json({ usuario, token })

                    console.log('Usuario sí existe');
                    console.log(token);
                    console.log(decodificarToken);
                    if (decodificarToken.exp && decodificarToken.exp < tiempoToken) {
                        console.log('El token ha expirado.');
                      } else {
                        console.log('El token sigue siendo válido.');
                      };
                } else {
                    console.log('Usuario no existe');
                    res.status(401).json({ message: 'Usuario no existe' });
                }
            }
        });
    } catch (e) {
        console.log(e);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

module.exports = {
    usuario
};
