const {Router} = require("express");

const {buscar} = require("../controladores/equipo_titular");

const router = Router();

router
    .get("/equipo_titular/buscar/:idConvocatoria", buscar)

module.exports = router;