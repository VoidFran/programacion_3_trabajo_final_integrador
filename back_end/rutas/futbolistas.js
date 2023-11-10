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
    .get("/futbolistas/buscar", buscar)
    .post("/futbolistas/agregar", upload.single("imagen"), agregar)
    .put("/futbolistas/editar", upload.single("imagen"), editar)
    .put("/futbolistas/eliminar/:idFutbolista", eliminar)

module.exports = router;