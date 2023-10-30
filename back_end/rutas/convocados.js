const {Router} = require("express");

const {buscar, editar} = require("../controladores/convocados");

const router = Router();

router
    .get("/convocados/buscar/:idConvocatoria", buscar)
    .put("/convocados/editar", editar)

module.exports = router;