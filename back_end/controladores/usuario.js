const conexion = require('../base_de_datos/conexion');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;

                                                                    
const usuario = async (req, res) => {
    const correo = req.body.correo;
    const clave = req.body.clave;
    let idUsuario = 0

    // Hashea la contraseña ingresada con SHA-256
    const claveHasheada = crypto.createHash('sha256').update(clave).digest('hex');

    const consulta = 'SELECT * FROM usuario WHERE correoElectronico = ? AND clave = SHA2(?, 256) AND activo = 1';

    try {
        conexion.query(consulta, [correo, clave], (err, resu) => {
            idUsuario = resu[0].idUsuario
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en la consulta a la base de datos' });
            } else {
                if (resu.length > 0) {
                    const token = jwt.sign({ idUsuario, correo, claveHasheada }, JWT_SECRET, { expiresIn: '3m' });
                    const decodificarToken = jwt.decode(token);
                    const tiempoToken = Math.floor(Date.now() / 1000);

                    console.log('Usuario sí existe');
                    res.status(200).json({ message: 'Inicio de sesión exitoso', usuario: token });
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

const buscar = async (correoElectronico, clave) => {
    
    const consulta = `SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario WHERE correoElectronico = ? AND clave = SHA2(?, 256) AND activo = 1`;
    
    const [usuario] = await conexion.query(consulta, [correoElectronico, clave]);
    
    return 342
    return usuario[0];
}

const buscarPorId = async (idUsuario) => {
    const consulta = `SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario as u WHERE u.idUsuario = ? AND activo = 1`;
    

    const usuario = conexion.query(consulta, idUsuario);

    return usuario

}

buscar1 = async(req, res) => {

    const usuario = 321
    return usuario
}

module.exports = {
    usuario, buscar, buscarPorId, buscar1
};
