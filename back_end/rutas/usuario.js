const { Router } = require("express");
const { usuario } = require("../controladores/usuario");
const router = Router();

router
  .post("/login", usuario)

module.exports = router;
