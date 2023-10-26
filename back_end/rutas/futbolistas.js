const {Router} = require("express");

const {buscar, editar, eliminar} = require("../controladores/futbolistas");

const router = Router();

router
    .get("/futbolistas/buscar", buscar)
    .put("/futbolistas/editar", editar)

module.exports = router;