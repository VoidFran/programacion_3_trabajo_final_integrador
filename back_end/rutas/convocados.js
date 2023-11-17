const {Router} = require("express");

const {buscar, editar, dorsal} = require("../controladores/convocados");

const router = Router();

router
    .get("/buscar/:idConvocatoria", buscar)
    .put("/editar", editar)
    .put("/dorsal/:idFutbolistaConvocatoria", dorsal)

module.exports = router;