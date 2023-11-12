const passport = require('passport');
const passportJWT = require("passport-jwt");
const usuario = require('../controladores/usuario');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

const conexion = require('../base_de_datos/conexion');

//Defino como se validan los tokens que recibimos 
passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET 
}, 
    async (jwtPayload, cb) => {

        const _consulta = `SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario as u WHERE u.idUsuario = ? AND activo = 1`;
        const _usuario = conexion.query(_consulta, jwtPayload.idUsuario);
        
        if (_usuario) {
            console.log("Token correcto")
            return cb(null, _usuario);
        } else {
            console.log("Token incorrecto")
            return cb(null, false, { message: 'Token incorrecto.' });
        }
    }
));