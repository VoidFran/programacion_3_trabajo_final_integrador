const Router = require('express');
const { buscarConv, buscarFub } = require('../controladores/estadisticas');
const router = Router();

router
    .get('/buscarConv', buscarConv)
    .get('/buscarFub', buscarFub); 

module.exports = router;
