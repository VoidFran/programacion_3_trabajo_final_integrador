const {Router} = require("express");

const {subir} = require("../controladores/archivo")

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

router.post("/archivo/subir", upload.single("image"), subir);

module.exports = router;