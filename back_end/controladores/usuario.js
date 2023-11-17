const conexion = require('../base_de_datos/conexion');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const passport = require("passport");
                                                                    
const usuario = async (req, res) => {
    const correo = req.body.correo;
    const clave = req.body.clave;

    // Hashea la contraseña ingresada con SHA-256
    const claveHasheada = crypto.createHash('sha256').update(clave).digest('hex');

    const consulta = 'SELECT * FROM usuario WHERE correoElectronico = ? AND clave = SHA2(?, 256) AND activo = 1';
    
    passport.authenticate('local', { session: false }, (err, _usuario, info) => {
        console.log("usuaruio info", info)
        if (err || !_usuario) {
            return res.status(400).json({estado:'FALLO', msj:info});
        }

        // si existe el usuario, armo el token
        if (err) {
            console.log("uerr", err)
            res.send(err);
        }
        
        const token = jwt.sign(_usuario, process.env.JWT_SECRET);
        console.log("usuario + token", _usuario, token)
        return res.json({ _usuario, token });
    })(req, res);
};

module.exports = {
    usuario
};
