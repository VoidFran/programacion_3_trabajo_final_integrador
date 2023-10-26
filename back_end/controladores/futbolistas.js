const conexion = require('../base_de_datos/conexion');

// retorna todos los futbolistas activos
buscar = async(req, res) => {
    conexion.query('SELECT * FROM futbolista WHERE activo = 1',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
}

editar = async(req, res) => {
    const idFutbolista = req.body.idFutbolista;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const posicion = req.body.posicion;
    const apodo = req.body.apodo;
    const foto = req.body.foto;
    const pieHabil = req.body.pieHabil;
    const activo = req.body.activo;


    conexion.query('UPDATE futbolista SET dni=?,nombre=?,apellido=?,posicion=?,apodo=?,foto=?,pieHabil=?,activo=? WHERE idFutbolista=?',[dni, nombre, apellido, posicion, apodo, foto, pieHabil, activo, idFutbolista],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
 }

module.exports = {
    buscar, editar
}