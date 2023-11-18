const {Router} = require("express");

const {enviar_correo} = require("../controladores/contacto")

const router = Router();

router.post("/enviar_correo", enviar_correo);

module.exports = router;