const passport = require('passport');
const passportJWT = require("passport-jwt");
const usuario = require('../controladores/usuario');
require('dotenv').config();

const ExtractJWT = passportJWT.ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const JWTStrategy = passportJWT.Strategy;

const conexion = require('../base_de_datos/conexion');

//Defino como se validan los usuarios en la estrategia local
passport.use(new LocalStrategy({
    usernameField: 'correoElectronico',
    passwordField: 'clave'
}, 
async (correoElectronico, clave, cb) => {
    try {
        conexion.query(`SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario WHERE correoElectronico = ? AND clave = SHA2(?, 256) AND activo = 1`,[correoElectronico, clave],
        (err, result) => {
            if (err) {
                console.log(err)
            }
            else {
                let _usuario
                _usuario = result[0]
                return cb(null, _usuario, { message: 'Login correcto!' });
            }
        })
    } catch (exc) {
        cb(exc);
    }
}
));

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