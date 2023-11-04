const conexion = require('../base_de_datos/conexion');


buscarConv = async(req, res) => {
    conexion.query("SELECT * FROM convocatoria",
    (err,result)=>{
        if (err) {
            console.log(err)
        } 
        else {
            res.send(result)
        }
    })
};


buscarFub = async(req, res) => {
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


module.exports = {
 buscarConv, buscarFub
}
