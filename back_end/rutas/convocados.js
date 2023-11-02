const {Router} = require("express");

const {buscar, editar, dorsal} = require("../controladores/convocados");

const router = Router();

router
    .get("/convocados/buscar/:idConvocatoria", buscar)
    .put("/convocados/editar", editar)
    .put("/convocados/dorsal/:idFutbolistaConvocatoria", dorsal)

module.exports = router;