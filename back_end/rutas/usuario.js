const { Router } = require("express");
const { usuario } = require("../controladores/usuario");
const router = Router();

router
  .post("/usuario", usuario)

module.exports = router;
