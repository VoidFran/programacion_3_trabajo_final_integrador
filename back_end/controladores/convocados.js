const conexion = require("../base_de_datos/conexion")

const agregar =  async(req, res) => {
    const {idConvocatoria, convocados_lista} = req.body;

    // por cada futbolista inserto en la bd
    convocados_lista.forEach(async element => {
        const dato = {convocatoria:idConvocatoria, futbolista:element}
        const consulta = 'INSERT INTO futbolistaConvocatoria SET ?';
        conexion.query(consulta, dato)
    })
}

module.exports = {
    agregar
}