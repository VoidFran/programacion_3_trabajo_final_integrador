const {Router} = require("express");

const {buscar, agregar, editar, eliminar} = require("../controladores/futbolistas");

const router = Router();

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "publico/imagenes")
    },
    filename: (req, file, cb) => {  // asignamos el nombre del archivo
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
});

router
    .get("/buscar", buscar)
    .post("/agregar", upload.single("imagen"), agregar)
    .put("/editar", upload.single("imagen"), editar)
    .put("/eliminar/:idFutbolista", eliminar)

module.exports = router;