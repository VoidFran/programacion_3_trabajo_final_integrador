const conexion = require("../base_de_datos/conexion")

/*
configuracion multer.
le indicamos donde guardamos los archivos
y el nombre del archivo
*/

const subir = async(req, res) => {
    console.log(req.file)

    const imagen = req.file.filename
    console.log(imagen)
    const consulta = "UPDATE futbolista SET foto=?"
    conexion.query(consulta, imagen)
}

module.exports = {
    subir
}