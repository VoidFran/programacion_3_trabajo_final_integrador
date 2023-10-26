const {Router} = require("express");

const {buscar, agregar, editar, eliminar} = require("../controladores/rivales");

const router = Router();

router
    .get("/rivales/buscar", buscar)
    .post("/rivales/agregar", agregar)
    .put("/rivales/editar", editar)
    .delete("/rivales/eliminar/:idRival", eliminar)

module.exports = router;