const conexion = require('../base_de_datos/conexion');

// retorna todos los futbolistas activos
buscar = async(req, res) => {
    conexion.query(`SELECT idFutbolista, foto, dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'Arquero'
        WHEN posicion = 1 THEN 'Defensor'
        WHEN posicion = 2 THEN 'Medio'
        WHEN posicion = 3 THEN 'Delantero'
    END) as posicion,
    apodo,
    (CASE
        WHEN pieHabil = 0 THEN 'Derecho'
        WHEN pieHabil = 1 THEN 'Izquierdo'
    END) as pieHabil
    FROM futbolista WHERE activo = 1`,
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });

    const usuario = 321
    return usuario
}

agregar = async(req, res) => {
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const posicion = req.body.posicion;
    const apodo = req.body.apodo;
    const foto = req.file.filename;
    const pieHabil = req.body.pieHabil;
    const activo = req.body.activo;

    console.log(req.file)

    conexion.query('INSERT INTO futbolista(dni,nombre,apellido,posicion,apodo,foto,pieHabil,activo) VALUES(?,?,?,?,?,?,?,?)',[dni, nombre, apellido, posicion, apodo, foto, pieHabil, activo],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    })
}

editar = async(req, res) => {
    const idFutbolista = req.body.idFutbolista;
    const dni = req.body.dni;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const posicion = req.body.posicion;
    const apodo = req.body.apodo;
    const foto = req.file.filename;
    const pieHabil = req.body.pieHabil;
    const activo = req.body.activo;

    console.log(req.file)

    conexion.query('UPDATE futbolista SET dni=?,nombre=?,apellido=?,posicion=?,apodo=?,foto=?,pieHabil=?,activo=? WHERE idFutbolista=?',[dni, nombre, apellido, posicion, apodo, foto, pieHabil, activo, idFutbolista],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
 }

 eliminar = async(req, res) => {
    const idFutbolista = req.params.idFutbolista;
    const activo = req.body.activo;

    conexion.query('UPDATE futbolista SET activo=? WHERE idFutbolista=?',[activo, idFutbolista],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
 }

module.exports = {
    buscar, agregar, editar, eliminar
}