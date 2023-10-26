const {Router} = require("express");

const {buscar, agregar, editar, eliminar} = require("../controladores/convocatorias");

const router = Router();

router
    .get("/convocatorias/buscar", buscar)
    .post("/convocatorias/agregar", agregar)
    .put("/convocatorias/editar", editar)
    .delete("/convocatorias/eliminar/:idConvocatoria", eliminar)

module.exports = router;