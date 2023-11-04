const { Router } = require("express");
const { usuario } = require("../controladores/usuario");
const router = Router();

router
  .post("/usuario", usuario)
  .get("/usuario", (req, res) => {
    // Accede a los datos enviados en la solicitud POST
    const correo = req.body.correo;
    const clave = req.body.clave;


    
  });

module.exports = router;
