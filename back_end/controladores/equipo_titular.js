const conexion = require("../base_de_datos/conexion")

const buscar =  async(req, res) => {
    const {idConvocatoria} = req.params

    conexion.query(`SELECT f.idFutbolista, f.foto, f.nombre, f.apellido,
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
    WHERE f.activo = 1 AND fc.esTitular = 1 AND fc.convocatoria = ?`, idConvocatoria,
    (err,result)=>{
        if(err){
            console.log(err)
        }else{
            res.send(result)
        }
    })
}


module.exports = {
    buscar
}