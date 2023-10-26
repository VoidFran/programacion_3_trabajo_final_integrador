const conexion = require("../base_de_datos/conexion")

buscar = async(req, res) => {
    conexion.query('SELECT * FROM rival WHERE activo = 1',
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
}

agregar = async(req, res) => {
    const nombre = req.body.nombre
    const activo = req.body.activo

    conexion.query("INSERT INTO rival(nombre, activo) VALUES(?, ?)", [nombre, activo],
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
    const idRival = req.body.idRival
    const nombre = req.body.nombre
    const activo = req.body.activo
    
    conexion.query("UPDATE rival SET nombre = ?, activo = ? WHERE idRival = ?", [nombre, activo, idRival],
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
    const idRival = req.params.idRival

    conexion.query("DELETE FROM rival WHERE idRival = ?", idRival,
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