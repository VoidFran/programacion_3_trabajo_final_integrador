const conexion = require("../base_de_datos/conexion")

buscar = async(req, res) => {
    conexion.query("SELECT * FROM convocatoria",
    (err,result)=>{
        if (err) {
            console.log(err)
        } 
        else {
            res.send(result)
        }
    })
}

agregar = async(req, res) => {
    const fecha = req.body.fecha
    const rival = req.body.rival
    const golesRecibidos = req.body.golesRecibidos
    const golesConvertidos = req.body.golesConvertidos

    conexion.query("INSERT INTO convocatoria(fecha, rival, golesRecibidos, golesConvertidos) VALUES(?, ?, ?, ?)", [fecha, rival, golesRecibidos, golesConvertidos],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
}

editar = async(req, res) => {
    const idConvocatoria = req.body.idConvocatoria
    const fecha = req.body.fecha
    const rival = req.body.rival
    const golesRecibidos = req.body.golesRecibidos
    const golesConvertidos = req.body.golesConvertidos
    
    conexion.query("UPDATE convocatoria SET fecha = ?, rival = ?, golesRecibidos = ?, golesConvertidos = ? WHERE idConvocatoria = ?", [fecha, rival, golesRecibidos, golesConvertidos, idConvocatoria],
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
}

eliminar = async(req, res) => {
    const idConvocatoria = req.params.idConvocatoria

    conexion.query("DELETE FROM convocatoria WHERE idConvocatoria = ?", idConvocatoria,
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else{
            res.send(result)
        }
    })
}

module.exports = {
    buscar, agregar, editar, eliminar
}