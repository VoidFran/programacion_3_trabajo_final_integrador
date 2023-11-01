const conexion = require("../base_de_datos/conexion")

const buscar = async(req, res) => {
    const {idConvocatoria} = req.params

    conexion.query(`SELECT f.idFutbolista, fc.idFutbolistaConvocatoria, f.foto, f.nombre, f.apellido,
    (CASE
        WHEN f.posicion = 0 THEN 'Arquero'
        WHEN f.posicion = 1 THEN 'Defensor'
        WHEN f.posicion = 2 THEN 'Medio'
        WHEN f.posicion = 3 THEN 'Delantero'
    END) as posicion,
    (CASE
        WHEN f.pieHabil = 0 THEN 'Derecha'
        WHEN f.pieHabil = 1 THEN 'Izquierda'
    END) as pieHabil, 
    fc.dorsal, fc.convocatoria,
    (CASE
        WHEN fc.esCapitan = 0 THEN 'No'
        WHEN fc.esCapitan = 1 THEN 'Si'
    END) as capitan,
	(CASE
        WHEN fc.esTitular = 0 THEN 'No'
        WHEN fc.esTitular = 1 THEN 'Si'
    END) as titular
    FROM futbolista AS f
    INNER JOIN futbolistaConvocatoria AS fc on fc.futbolista = f.idFutbolista
    WHERE f.activo = 1 AND fc.convocatoria = ?`, idConvocatoria,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}

editar = async(req, res) => {
    const {idConvocatoria, titulares_lista, capitan} = req.body

    // pongo los titulres en 0
    const consulta_1 = "UPDATE futbolistaconvocatoria SET dorsal = 0, esCapitan = 0, esTitular = 0 WHERE convocatoria = ?" 
    conexion.query(consulta_1, idConvocatoria)

    // agrego los titulres
    titulares_lista.forEach(async element => {
        const consulta = "UPDATE futbolistaconvocatoria SET dorsal = 0, esTitular = 1 WHERE idFutbolistaConvocatoria = ?"
        conexion.query(consulta, element)
    })

    // establesco el capitan
    const consulta_2 = "UPDATE futbolistaconvocatoria SET dorsal = 22, esCapitan = 1, esTitular = 1 WHERE idFutbolistaConvocatoria = ?" 
    conexion.query(consulta_2, capitan)
}

module.exports = {
    buscar, editar
}