const {Router} = require("express");

const {buscar, agregar, editar, eliminar} = require("../controladores/futbolistas");

const router = Router();

router
    .get("/futbolistas/buscar", buscar)
    .post("/futbolistas/agregar", agregar)
    .put("/futbolistas/editar", editar)
    .put("/futbolistas/eliminar/:idFutbolista", eliminar)

module.exports = router;