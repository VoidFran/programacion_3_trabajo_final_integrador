const {Router} = require("express");

const {buscar, agregar, editar, eliminar} = require("../controladores/convocatorias");

const router = Router();

router
    .get("/buscar", buscar)
    .post("/agregar", agregar)
    .put("/editar", editar)
    .delete("/eliminar/:idConvocatoria", eliminar)

module.exports = router;