const { Router } = require("express");
const { _usuario } = require("../controladores/usuario");
const router = Router();

router
  .post("/login", _usuario)

module.exports = router;
