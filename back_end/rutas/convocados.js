const {Router} = require("express");

const {buscar} = require("../controladores/convocados");

const router = Router();

router
    .get("/convocados/buscar/:idConvocatoria", buscar)

module.exports = router;