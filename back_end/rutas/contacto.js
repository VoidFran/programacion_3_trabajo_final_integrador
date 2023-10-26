const {Router} = require("express");

const {enviar_correo} = require("../controladores/contacto")

const router = Router();

router.post("/contacto", enviar_correo);

module.exports = router;