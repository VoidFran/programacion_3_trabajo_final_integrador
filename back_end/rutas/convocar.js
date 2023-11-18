const {Router} = require("express");

const {buscar, agregar} = require("../controladores/convocar");

const router = Router();

router
    .get("/buscar", buscar)
    .head("/buscar", buscar)
    .post("/agregar", agregar)

module.exports = router;