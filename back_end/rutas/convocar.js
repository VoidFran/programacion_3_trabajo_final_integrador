const {Router} = require("express");

const {agregar} = require("../controladores/convocar");

const router = Router();

router
    .get("/futbolistas/buscar", buscar)
    .post("/convocar/agregar", agregar)

module.exports = router;