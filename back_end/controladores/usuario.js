const conexion = require('../base_de_datos/conexion');
const jwt = require("jsonwebtoken");
const crypto = require('crypto');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;


usuario = async (req, res) => {
    const correo = req.body.correo;
    const clave = req.body.clave;

    // Hashea la contraseña ingresada con SHA-256
    const claveHasheada = crypto.createHash('sha256').update(clave).digest('hex');

    const consulta = 'SELECT * FROM usuario WHERE correoElectronico = ? AND clave = ?';
    console.log(correo)
    console.log(clave)

    try {
        conexion.query(consulta, [correo, claveHasheada], (err, resu) => {
            if (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en la consulta a la base de datos' });
            } else {
                if (resu.length > 0) {
                    const token = jwt.sign({ correo, claveHasheada }, JWT_SECRET, { expiresIn: '3m' });
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

const buscarPorId = async (idUsuario) => {

    const consulta = `SELECT idUsuario, nombre, apellido, tipoUsuario, correoElectronico 
        FROM usuario as u WHERE u.idUsuario = ? AND activo = 1`;

    const [usuario] = await conexion.query(consulta, [idUsuario]);

    return usuario[0];
}

module.exports = {
    usuario,
    buscarPorId
};
