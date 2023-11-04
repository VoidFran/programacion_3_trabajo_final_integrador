const Router = require('express');
const { buscarConv, buscarFub } = require('../controladores/estadisticas');
const router = Router();

router
    .get('/estadistica/buscarConv', buscarConv)
    .get('/estadistica/buscarFub', buscarFub); 

module.exports = router;
