const {Router} = require("express");

const {buscar, agregar, editar, eliminar} = require("../controladores/rivales");

const router = Router();

router
    .get("/buscar", buscar)
    .post("/agregar", agregar)
    .post("/editar", editar)
    .delete("/eliminar/:idRival", eliminar)

module.exports = router;