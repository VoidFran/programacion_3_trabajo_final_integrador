const conexion = require("../base_de_datos/conexion")

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
}

const agregar = async(req, res) => {
    const {idConvocatoria, convocados_lista, fecha} = req.body

    // borro la convocatoria anterior
    const consulta = 'DELETE FROM futbolistaConvocatoria WHERE convocatoria = ?'
    conexion.query(consulta, idConvocatoria)

    // por cada futbolista inserto en la bd
    convocados_lista.forEach(async element => {
        const dato = {convocatoria: idConvocatoria, futbolista: element, fecha: fecha}
        const consulta = "INSERT INTO futbolistaconvocatoria SET ?"
        conexion.query(consulta, dato)
    })
}

module.exports = {
    buscar, agregar
}