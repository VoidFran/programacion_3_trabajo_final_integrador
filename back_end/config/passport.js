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
    (correoElectronico, clave, cb) => {
        try {
            const _usuario = _usuario.buscar(correoElectronico, clave);
            console.log("asda: ", _usuario)
            if (!_usuario) {
                return cb(null, false, { message: 'Nombre de usuario y/o contraseña incorrectos.' });
            } else {
                return cb(null, _usuario, { message: 'Login correcto!' });
            }
        } catch (exc) {
            console.log("e", e);
            res.status(500).json({ message: 'Error en el servidor' });
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
            return cb(null, _usuario);
        } else {
            return cb(null, false, { message: 'Token incorrecto.' });
        }
    }
));