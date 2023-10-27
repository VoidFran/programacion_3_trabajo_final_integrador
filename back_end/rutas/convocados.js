const {Router} = require("express");

const {agregar} = require("../controladores/convocados");

const router = Router();

router
    .post("/convocados/agregar", agregar)
    //.delete("/convocados/eliminar/:idConvocatoria", eliminar)

module.exports = router;